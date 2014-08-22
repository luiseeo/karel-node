/* Archivo con léxico y sintaxis de Karel Web, java-like */

/* lexical grammar */
%lex
id                          [a-zA-Z][a-zA-Z0-9'-']*
%%
"//".*						/* ignorar comentarios */
"/*"(.|\n)*"*/"				/* ignorar comentarios */
"class"				return 'CLASS';
"program"				return 'PROGRAM';
"void"				return 'VOID';
"define"				return 'DEFINE';
"turnoff"				return 'TURNOFF';
"turnleft"			return 'TURNLEFT';
"move"				return 'MOVE';
"pickbeeper"			return 'PICKBEEPER';
"putbeeper"			return 'PUTBEEPER';
"return"				return 'RETURN';
"pred"				return 'PRED';
"succ"				return 'SUCC';
"iszero"				return 'ISZERO';
"if"					return 'IF';
"else"				return 'ELSE';
"while"				return 'WHILE';
"iterate"				return 'ITERATE';
"frontIsClear"		return 'FRONTISCLEAR';
"frontIsBlocked"		return 'FRONTISBLOCKED';
"leftIsClear"			return 'LEFTISCLEAR';
"leftIsBlocked"		return 'LEFTISBLOCKED';
"rightIsClear"		return 'RIGHTISCLEAR';
"rightIsBlocked"		return 'RIGHTISBLOCKED';
"nextToABeeper"		return 'NEXTOABEEPER';
"beepersInBag"		return 'BEEPERSINBAG';
"facingNorth"			return 'FACINGNORTH';
"facingSouth"			return 'FACINGSOUTH';
"facingEast"			return 'FACINGEAST';
"facingWest"			return 'FACINGWEST';
([1-9][0-9]*|"0")			return 'DECIMAL';
{id}                   return 'ID';		
"||"                   return 'OR';
"&&"                   return 'AND';
"!"                   return '!';
";"                   return 'PUNTOCOMA';
"{"                   return '{';
"}"                   return '}';
"("                   return '(';
")"                  return ')';
\s+               /*skip whitespace */
<<EOF>>               return 'EOF';
. return 'INVALID';

/lex

%left '!'
 
%start programa


%% /* language grammar */

primera: CLASS PROGRAM '{' 
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

segunda: metodos PROGRAM '(' ')'
%{
	//agregar procedimiento al directorio de procedimientos
	procActual = $2;
	dirproc[procActual]={parametro:undefined,cuadruplo: cuadruplos.length, memoria:{enteros:100000,booleanos:3000000}};
%} 

	;
programa: primera segunda bloque '}' EOF
%{
//Generar el END del programa principal
	//cuadruplos.push([commands["END"],"","",""]);
	cuadruplos[0][1]=dirproc["program"].memoria.enteros;
	cuadruplos[0][2]=dirproc["program"].memoria.booleanos;
	cuadruplos[1][3]=dirproc["program"].cuadruplo;
//Procedimiento para revisar la semantica y soportar llamadas entre procedimientos
	for( i=0 ; i< llamadas.length; i++ ){
	    	llamada = llamadas[i];
		//checar que el procedimiento exista
		if (dirproc[llamada.id]===undefined){
			errores.push({message:"error, el procedimiento '"+llamada.id+"' no existe",lineNo:llamada.linea});
			break;
		}
		//checar que este procedimiento no necesite parametro
		if (dirproc[llamada.id].parametro!==undefined && llamada.idvar===undefined){
			errores.push({message:"El procedimiento '"+llamada.id+"' lleva parametro",lineNo:llamada.linea});
			break;
		//checar que este procedimiento necesite parametro
		}else if (dirproc[llamada.id].parametro===undefined && llamada.idvar!==undefined){
			errores.push({message:"El procedimiento '"+llamada.id+"' no lleva parametro",lineNo:llamada.linea});
			break;
		}else{
		    cuadruplos[ llamada.cuadruplo ][1]= dirproc[llamada.id].cuadruplo;
		    if( llamada.idvar !== undefined)
		    	cuadruplos[ llamada.cuadruplo ][2]= dirproc[llamada.id].parametro.dir;
		    cuadruplos[ llamada.cuadruplo -1 ][1]= dirproc[llamada.id].memoria.enteros;
		    cuadruplos[ llamada.cuadruplo -1 ][2]= dirproc[llamada.id].memoria.booleanos;
		}
	}
	
%}
	;
metodos: metodo metodos
      	| /*vacio*/
      	;	
metodo: tipo firma bloque
%{
	cuadruplos.push([commands["RETURN"],"","",""]);
%}
      	;
tipo: VOID 
      | DEFINE
      ;
firma: ID '(' parametro ')'
%{
	procActual = $1;
    	// Verificar que su id sea correcto
	if ( dirproc[procActual] !== undefined){
	    errores.push({message:"El procedimiento '"+procActual+"' ya fue definido.",lineNo:llamada.linea});
	}
	    
	//agregar procedimiento al directorio de procedimientos
	if ( $3 === undefined){
		dirproc[procActual]={parametro:undefined,cuadruplo: programaCompilado.cuadruplos.length, memoria:{enteros:100000,booleanos:3000000}};
	}else{
		dirproc[procActual]={parametro:{id:$3,dir:100000},cuadruplo: programaCompilado.cuadruplos.length, memoria:{enteros:100001,booleanos:3000000}};
	}
%} 
      		;
parametro: ID { $$=$1;}
	| /*vacio*/ { $$=undefined;}
      			;
estatuto: TURNOFF '(' ')' PUNTOCOMA
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["END"],"","",""]);
%}
      	|TURNLEFT '(' ')' PUNTOCOMA
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["GIRA_IZQ"],"","",""]);
%}
	|MOVE '(' ')' PUNTOCOMA
%{
	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	cuadruplos.push([commands["AVANZA"],"","",""]);
%}
	|PICKBEEPER '(' ')' PUNTOCOMA
%{
	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	cuadruplos.push([commands["COGE_ZUM"],"","",""]);
%}
	|PUTBEEPER '(' ')' PUNTOCOMA
%{
	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	cuadruplos.push([commands["DEJA_ZUM"],"","",""]);
%}
	|RETURN '(' ')' PUNTOCOMA
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["RETURN"],"","",""]);
%}
	|llamada
	|ifestatuto
	|whileloop
	|iterate
	|PUNTOCOMA
	|bloque
	;
estatutos: estatuto estatutos
	  | estatuto
	  ;
bloque: '{' estatutos '}'
	  | '{' '}'
	  ;
llamada: ID '(' argumento ')' PUNTOCOMA 
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
ifthen: IF '(' termino ')' 
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    PSaltos.push(cuadruplos.length);
    cuadruplos.push([commands["GOTOF"],POperandos.pop(),"",""]);
%}
    	;
elset: ELSE
%{
    cuadruplos.push([commands["GOTO"],"","",""]);
    gotof = PSaltos.pop();
    cuadruplos[gotof][3]= cuadruplos.length;
    PSaltos.push(cuadruplos.length-1);
%}
	;
ifestatuto: ifthen estatuto
%{
    gotof = PSaltos.pop();
    cuadruplos[gotof][3] = cuadruplos.length;
%}
	| ifthen estatuto elset estatuto
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
whiletermino: whilet '(' termino ')'
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	PSaltos.push(cuadruplos.length);
  	cuadruplos.push([commands["GOTOF"],POperandos.pop(),"",""]);  	
%}
	;
whileloop: whiletermino estatuto
%{
    	gotof = PSaltos.pop();
	loop = PSaltos.pop();
	cuadruplos.push([commands["GOTO"],"","",loop]);
	cuadruplos[gotof][3]=cuadruplos.length;
%}
	  ;
iterateexpr: ITERATE '(' expresion ')'
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
iterate:  iterateexpr estatuto
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
	 if ( operador === commands["OR"]){ 
             cuadruplos.push([operador,POperandos.pop() ,POperandos.pop(),dirproc[procActual].memoria.booleanos++]);
             POperandos.push(dirproc[procActual].memoria.booleanos-1);
         }else{
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
         }else{
             POperadores.push(operador);
         }
	  
%}                              
	    ; 
not: '!' { POperadores.push(commands["NOT"]); }
	;
clausulano: clausulaAtomica
	| not clausulaAtomica 
%{ 
	operador = POperadores.pop();
	 if ( operador === commands["NOT"]){ 
             cuadruplos.push([operador,POperandos.pop() ,"",dirproc[procActual].memoria.booleanos++]);
             POperandos.push(dirproc[procActual].memoria.booleanos-1);
         }else{
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
	| parentesis termino ')' {	POperadores.pop(); /*Quitar fondo falso '('*/}
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
