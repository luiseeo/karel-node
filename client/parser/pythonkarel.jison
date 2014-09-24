/* Archivo con léxico y sintaxis de Karel Web, python-like */

/* lexical grammar */
%{
var currentIndentation = 0,
    indentStack = [0];
%}

%lex
id                          [a-zA-Z][a-zA-Z0-9'-']*

%x indent normal

%%
<INITIAL>.                      %{
                                    currentIndentation = 0;
                                    indentStack = [0];
                                    console.log("start of file");
                                    this.unput(yytext);
                                    this.begin("normal");
                                    return 'START';
                                %}
<normal>"#".*                   /* ignorar comentarios */
<normal>"\"\"\""(.|\n)*"\"\"\""  /* ignorar comentarios */
<normal>"program"               return 'PROGRAM';
<normal>"def"                   return 'DEF';
<normal>"turnoff"               return 'TURNOFF';
<normal>"turnleft"              return 'TURNLEFT';
<normal>"move"                  return 'MOVE';
<normal>"pickbeeper"            return 'PICKBEEPER';
<normal>"putbeeper"             return 'PUTBEEPER';
<normal>"return"                return 'RETURN';
<normal>"pred"                  return 'PRED';
<normal>"succ"                  return 'SUCC';
<normal>"iszero"                return 'ISZERO';
<normal>"if"                    return 'IF';
<normal>"else"                  return 'ELSE';
<normal>"while"                 return 'WHILE';
<normal>"for"                   return 'FOR';
<normal>"in"                    return 'IN';
<normal>"range"                 return 'RANGE';
<normal>"frontIsClear"          return 'FRONTISCLEAR';
<normal>"frontIsBlocked"        return 'FRONTISBLOCKED';
<normal>"leftIsClear"           return 'LEFTISCLEAR';
<normal>"leftIsBlocked"         return 'LEFTISBLOCKED';
<normal>"rightIsClear"          return 'RIGHTISCLEAR';
<normal>"rightIsBlocked"        return 'RIGHTISBLOCKED';
<normal>"nextToABeeper"         return 'NEXTOABEEPER';
<normal>"beepersInBag"          return 'BEEPERSINBAG';
<normal>"facingNorth"           return 'FACINGNORTH';
<normal>"facingSouth"           return 'FACINGSOUTH';
<normal>"facingEast"            return 'FACINGEAST';
<normal>"facingWest"            return 'FACINGWEST';
<normal>([1-9][0-9]*|"0")       return 'DECIMAL';
<normal>"or"                    return 'OR';
<normal>"and"                   return 'AND';
<normal>"not"                   return 'NOT';
<normal>{id}                    return 'ID';

<indent>" "                     currentIndentation += 1;
<indent>\t                      currentIndentation += (currentIndentation + 4) & ~3;
<indent>\n                      currentIndentation = 0;
<indent><<EOF>>                 %{
                                    this.popState();
                                    var dedents = [];
                                    while (0 < indentStack[0]) {
                                        console.log("DEDENT");
                                        dedents.push('DEDENT');
                                        indentStack.shift();
                                    }
                                    dedents.unshift('EOF');
                                    if (dedents.length > 0) return dedents;
                                %}
<indent>.                       %{
                                    console.log("Identation ended with " + currentIndentation + " chars");
                                    this.unput(yytext);
                                    if (currentIndentation > indentStack[0]) {
                                        // We found an inner indentation
                                        indentStack.unshift(currentIndentation);
                                        console.log("INDENT");
                                        console.log(indentStack);
                                        this.popState();
                                        return 'INDENT';
                                    }
                                    var dedents = [];
                                    while (currentIndentation < indentStack[0]) {
                                        console.log("DEDENT");
                                        dedents.push('DEDENT');
                                        indentStack.shift();
                                    }
                                    if (currentIndentation !== indentStack[0]) {
                                        // Raise an error
                                        return 'INDENTERROR';
                                    }
                                    
                                    this.popState();
                                    if (dedents.length > 0) return dedents;
                                %}
<normal>\n                      %{
                                    currentIndentation = 0;
                                    console.log("changing to indent state");
                                    this.begin("indent"); 
                                %}
<normal>\s*<<EOF>>              %{
                                    var dedents = [];
                                    while (0 < indentStack[0]) {
                                        console.log("DEDENT");
                                        dedents.push('DEDENT');
                                        indentStack.shift();
                                    }
                                    dedents.unshift('EOF');
                                    if (dedents.length > 0) return dedents;
                                %}
<normal>":"                     return ':';
<normal>"("                     return '(';
<normal>")"                     return ')';
<normal>\s+                     /* ignore whitespace */
<normal><<EOF>>                 return 'EOF';

. return 'INVALID';

/lex

%left 'NOT'
 
%start programa

%ebnf

%options token-stack

%% /* language grammar */

primera: START
%{
    POperandos = new Array();
    POperadores = new Array();
    PSaltos = new Array();
    llamadas = new Array();
    dirproc = programaCompilado.dirproc;
    cuadruplos = programaCompilado.cuadruplos;
    constantes = programaCompilado.constantes;
    errores = programaCompilado.errores;
    commands = programaCompilado.commands;
    //Agregar cuadruplo para ir al procedimiento principal "program"
    cuadruplos.push([commands["ERA"],"","",""]);
    cuadruplos.push([commands["GOTO"],"","",""]);
%}
;

segunda: metodos 
%{
    //agregar intrucciones sueltas como metodo "program", el punto de entrada
    procActual = "program";
    dirproc[procActual]={parametro:undefined,cuadruplo: cuadruplos.length, memoria:{enteros:100000,booleanos:3000000}};
%} 
;

programa: primera segunda estatutos EOF
%{
    //Generar el END del programa principal
    //cuadruplos.push([commands["END"],"","",""]);
    cuadruplos[0][1]=dirproc["program"].memoria.enteros;
    cuadruplos[0][2]=dirproc["program"].memoria.booleanos;
    cuadruplos[1][3]=dirproc["program"].cuadruplo;
    //Procedimiento para revisar la semantica y soportar llamadas entre procedimientos
    for (i = 0; i < llamadas.length; i++) {
        llamada = llamadas[i];
        //checar que el procedimiento exista
        if (dirproc[llamada.id] === undefined) {
            errores.push({message:"error, el procedimiento '"+llamada.id+"' no existe",lineNo:llamada.linea});
            break;
        }
        //checar que este procedimiento no necesite parametro
        if (dirproc[llamada.id].parametro !== undefined && llamada.idvar === undefined) {
            errores.push({ message:"El procedimiento '" + llamada.id + "' lleva parametro", lineNo:llamada.linea });
            break;
        }
        //checar que este procedimiento necesite parametro
        else if (dirproc[llamada.id].parametro === undefined && llamada.idvar !== undefined) {
            errores.push({ message:"El procedimiento '" + llamada.id + "' no lleva parametro", lineNo:llamada.linea });
            break;
        }
        else {
            cuadruplos[llamada.cuadruplo][1] = dirproc[llamada.id].cuadruplo;
            if(llamada.idvar !== undefined)
                cuadruplos[llamada.cuadruplo][2] = dirproc[llamada.id].parametro.dir;
            cuadruplos[llamada.cuadruplo - 1][1] = dirproc[llamada.id].memoria.enteros;
            cuadruplos[llamada.cuadruplo - 1][2] = dirproc[llamada.id].memoria.booleanos;
        }
    }
%}
;

metodos: metodo metodos
        | /*vacio*/
        ;
metodo: DEF firma ':' bloque
%{
    cuadruplos.push([commands["RETURN"],"","",""]);
%}
;

firma: ID '(' parametro ')'
%{
    procActual = $1;
    // Verificar que su id sea correcto
    if (dirproc[procActual] !== undefined) {
        errores.push({ message:"El procedimiento '" + procActual + "' ya fue definido.", lineNo:llamada.linea });
    }
        
    //agregar procedimiento al directorio de procedimientos
    if ($3 === undefined) {
        dirproc[procActual] = { parametro: undefined, cuadruplo: programaCompilado.cuadruplos.length, memoria: {enteros: 100000, booleanos: 3000000} };
    }
    else {
        dirproc[procActual] = {parametro: {id: $3, dir: 100000},cuadruplo: programaCompilado.cuadruplos.length, memoria: {enteros: 100001,booleanos: 3000000}};
    }
%}
;

parametro: ID { $$ = $1;}
    | /*vacio*/ { $$ = undefined;}
    ;

estatuto: TURNOFF '(' ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["END"],"","",""]);
%}
    |TURNLEFT '(' ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["GIRA_IZQ"],"","",""]);
%}
    |MOVE '(' ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["AVANZA"],"","",""]);
%}
    |PICKBEEPER '(' ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["COGE_ZUM"],"","",""]);
%}
    |PUTBEEPER '(' ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["DEJA_ZUM"],"","",""]);
%}
    |RETURN '(' ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["RETURN"],"","",""]);
%}
    |llamada
    |ifestatuto
    |whileloop
    |for
    ;

estatutos: estatuto estatutos
    | estatuto
    ;
bloque: INDENT estatutos DEDENT
    ;
estatutoobloque: estatuto
    | bloque
    ;

llamada: ID '(' argumento ')'
%{  
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["ERA"],$1,"",""]);
    llamadas.push({id:$1,idvar:$3,linea:yylineno+1,cuadruplo:cuadruplos.length});
    cuadruplos.push([commands["GOSUB"],"","",""]);
%}
;

argumento: expresion
%{
    cuadruplos.push([commands["PARAM"],POperandos.pop(),"",""]);
%}
    |/*vacio*/ 
    ;

ifthen: IF termino ':'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    PSaltos.push(cuadruplos.length);
    cuadruplos.push([commands["GOTOF"],POperandos.pop(),"",""]);
%}
;

elset: ELSE ':'
%{
    cuadruplos.push([commands["GOTO"],"","",""]);
    gotof = PSaltos.pop();
    cuadruplos[gotof][3]= cuadruplos.length;
    PSaltos.push(cuadruplos.length-1);
%}
;

ifestatuto: ifthen estatutoobloque
%{
    gotof = PSaltos.pop();
    cuadruplos[gotof][3] = cuadruplos.length;
%}
    | ifthen estatutoobloque elset estatutoobloque
%{
    salto = PSaltos.pop();
    cuadruplos[salto][3] = cuadruplos.length;       
%}
;

whilet: WHILE
%{
    PSaltos.push(cuadruplos.length);
%}
;

whiletermino: whilet termino ':'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    PSaltos.push(cuadruplos.length);
    cuadruplos.push([commands["GOTOF"],POperandos.pop(),"",""]);    
%}
;

whileloop: whiletermino estatutoobloque
%{
    gotof = PSaltos.pop();
    loop = PSaltos.pop();
    cuadruplos.push([commands["GOTO"],"","",loop]);
    cuadruplos[gotof][3]=cuadruplos.length;
%}
;

forexpr: FOR ID IN RANGE '(' expresion ')' ':'
%{
    cuadruplos.push([commands["SUCC"],POperandos.pop(),"",dirproc[procActual].memoria.enteros++]);
    PSaltos.push(cuadruplos.length);
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["PRED"],dirproc[procActual].memoria.enteros-1,"",dirproc[procActual].memoria.enteros-1]);
    cuadruplos.push([commands["ES_CERO"],dirproc[procActual].memoria.enteros-1,"",dirproc[procActual].memoria.booleanos++]);
    cuadruplos.push([commands["NOT"],dirproc[procActual].memoria.booleanos-1,"",dirproc[procActual].memoria.booleanos++]);
    PSaltos.push(cuadruplos.length);
    cuadruplos.push([commands["GOTOF"],dirproc[procActual].memoria.booleanos-1,"",""]);
%}
;

for: forexpr estatutoobloque
%{
    gotof = PSaltos.pop();
    loop = PSaltos.pop();
    cuadruplos.push([commands["GOTO"],"","",loop]);
    cuadruplos[gotof][3]=cuadruplos.length;
%}
;

expresion: DECIMAL 
%{ 
    POperandos.push("#"+$1);
%}
    |ID 
%{
    if ( dirproc[procActual].parametro.id !== $1)
        errores.push({message:"error, la variable '"+$1+"' no existe en ese contexto",lineNo:yylineno+1});
    else
        POperandos.push(dirproc[procActual].parametro.dir);
%}
    |PRED '(' expresion ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["PRED"],POperandos.pop() ,"",dirproc[procActual].memoria.enteros++]);
    POperandos.push(dirproc[procActual].memoria.enteros-1);
%}
    |SUCC '(' expresion ')'
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    cuadruplos.push([commands["SUCC"],POperandos.pop() ,"",dirproc[procActual].memoria.enteros++]);
    POperandos.push(dirproc[procActual].memoria.enteros-1);
%}
;

clausulayaux: clausulay OR { POperadores.push(commands["OR"]); }
;

termino: clausulay | clausulayaux termino
%{
    operador = POperadores.pop();
     if (operador === commands["OR"]) { 
        cuadruplos.push([operador,POperandos.pop() ,POperandos.pop(),dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos-1);
    }
    else {
        POperadores.push(operador);
    }
%}
;

clausulanoaux: clausulano AND { POperadores.push(commands["AND"]); }
;

clausulay: clausulano | clausulanoaux clausulay
%{
    operador = POperadores.pop();
    if ( operador === commands["AND"]){ 
        cuadruplos.push([operador,POperandos.pop() ,POperandos.pop(),dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos-1);
    }
    else {
        POperadores.push(operador);
    }
%}
;

not: NOT { POperadores.push(commands["NOT"]); }
;

clausulano: clausulaAtomica
    | not clausulaAtomica 
%{ 
    operador = POperadores.pop();
    if ( operador === commands["NOT"]) { 
        cuadruplos.push([operador,POperandos.pop() ,"",dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos-1);
    }
    else {
        POperadores.push(operador);
    }
%}
;

parentesis: '(' { POperadores.push('(');/*Poner fondo falso '('*/ }
;

clausulaAtomica: ISZERO '(' expresion ')'
%{
    cuadruplos.push([commands["ES_CERO"],POperandos.pop() ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    | funcionbooleana
    | parentesis termino ')' {  POperadores.pop(); /*Quitar fondo falso '('*/}
    ;

funcionbooleana: FRONTISCLEAR
%{
    cuadruplos.push([commands["FRENTE_LIB"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |FRONTISBLOCKED
%{
    cuadruplos.push([commands["FRENTE_BLO"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |LEFTISCLEAR
%{
    cuadruplos.push([commands["IZQ_LIB"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |LEFTISBLOCKED
%{
    cuadruplos.push([commands["IZQ_BLO"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |RIGHTISCLEAR
%{
    cuadruplos.push([commands["DER_LIB"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |RIGHTISBLOCKED
%{
    cuadruplos.push([commands["DER_BLO"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |NEXTOABEEPER
%{
    cuadruplos.push([commands["JUNTO_ZUM"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |BEEPERSINBAG
%{
    cuadruplos.push([commands["ZUM_MOCHILA"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |FACINGNORTH
%{
    cuadruplos.push([commands["NORTE"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |FACINGSOUTH
%{
    cuadruplos.push([commands["SUR"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |FACINGEAST
%{
    cuadruplos.push([commands["ESTE"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    |FACINGWEST
%{
    cuadruplos.push([commands["OESTE"],"" ,"",dirproc[procActual].memoria.booleanos++]);
    POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
    ;
