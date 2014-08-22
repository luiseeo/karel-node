/* Archivo con léxico y sintaxis de Karel Web, pascal-like */

/* Léxico */
%lex
id                          [a-zA-Z][a-zA-Z0-9"\-"]*

%%

"//".*						/* ignorar comentarios */
"{"(.|\n)*"}"				/* ignorar comentarios */
([1-9][0-9]*|"0")			return 'DECIMAL'
"iniciar-programa"			return 'INICIAR_PROGRAMA'
"finalizar-programa"		return 'FINALIZAR_PROGRAMA'
"inicia-ejecucion"			return 'INICIA_EJECUCION'
"termina-ejecucion"			return 'TERMINA_EJECUCION'
"define-nueva-instruccion"	return 'DEFINE'
"define-prototipo-instruccion"	return 'DEFINE_PROTOTIPO'
"como"						return 'COMO'
"apagate"					return 'APAGATE'
"gira-izquierda"			return 'GIRA_IZQUIERDA'
"avanza"					return 'AVANZA'
"coge-zumbador"				return 'COGE_ZUMBADOR'
"deja-zumbador"				return 'DEJA_ZUMBADOR'
"sal-de-instruccion"		return 'BREAK'
"inicio"					return 'INICIO'
"fin"						return 'FIN'
"sucede"					return 'SUCEDE'
"precede"					return 'PRECEDE'
"entonces"					return 'ENTONCES'
"sino"						return 'SINO'
"si"						return 'SI'
"mientras"					return 'MIENTRAS'
"hacer"						return 'HACER'
"repite"					return 'REPITE'
"veces"						return 'VECES'
"o"							return 'OR'
"y"							return 'AND'
"no"						return 'NO'
"es-cero"					return 'ES_CERO'
"frente-libre"				return 'FRENTE_LIBRE'
"frente-bloqueado"			return 'FRENTE_BLOQUEADO'
"izquierda-libre"			return 'IZQUIERDA_LIBRE'
"izquierda-bloqueada"		return 'IZQUIERDA_BLOQUEADA'
"derecha-libre"				return 'DERECHA_LIBRE'
"derecha-bloqueada"			return 'DERECHA_BLOQUEADA'
"junto-a-zumbador"			return 'JUNTO_A_ZUMBADOR'
"zumbador-en-mochila"		return 'ZUMBADOR_EN_MOCHILA'
"orientado-al-norte"		return 'ORIENTADO_AL_NORTE'
"orientado-al-sur"			return 'ORIENTADO_AL_SUR'
"orientado-al-este"			return 'ORIENTADO_AL_ESTE'
"orientado-al-oeste"		return 'ORIENTADO_AL_OESTE'
{id}						return 'ID'
";"							return 'PUNTOCOMA'
"("							return '('
")"							return ')'
\s+							/* skip whitespace */
<<EOF>>						return 'EOF'
.							return 'INVALID'

/lex
%left NO

%start programa

%% /* Sintaxis */
inicio: INICIAR_PROGRAMA
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
ejecucion: procedimientos INICIA_EJECUCION
%{
	//agregar procedimiento al directorio de procedimientos
	procActual = $2;
	dirproc[procActual]={parametro:undefined,cuadruplo: cuadruplos.length, memoria:{enteros:100000,booleanos:3000000}};
%}
;				
programa:	inicio
		ejecucion
		bloque
		TERMINA_EJECUCION
		FINALIZAR_PROGRAMA
		EOF
%{
//Generar el END del programa principal
	//cuadruplos.push([commands["END"],"","",""]);
	cuadruplos[0][1]=dirproc["inicia-ejecucion"].memoria.enteros;
	cuadruplos[0][2]=dirproc["inicia-ejecucion"].memoria.booleanos;
	cuadruplos[1][3]=dirproc["inicia-ejecucion"].cuadruplo;
//Procedimiento para revisar la semantica y soportar llamadas entre procedimientos
	for( i=0 ; i< llamadas.length; i++ ){
	    	llamada = llamadas[i];
		//checar que el procedimiento exista
		if (dirproc[llamada.id].cuadruplo === undefined){
			errores.push({message:"El procedimiento '"+llamada.id+"' no fue definido.",lineNo:llamada.linea});
			
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

procedimientos:   /*vacio*/
				| procedimientos procedimiento PUNTOCOMA
				| procedimientos prototipo
				;

procedimiento:	DEFINE firmaproc COMO estatuto
%{
	cuadruplos.push([commands["RETURN"],"","",""]);
%}
				;

prototipo:	DEFINE_PROTOTIPO firmaprot PUNTOCOMA
				;

firmaproc:			  ID
%{
    	procActual = $1;
    	if ( dirproc[procActual] !== undefined && dirproc[procActual].cuadruplo !== undefined){
	    errores.push({message:"El procedimiento '"+procActual+"' ya fue definido.",lineNo:llamada.linea});
	}

	//agregar procedimiento al directorio de procedimientos
	dirproc[procActual]={parametro:undefined,cuadruplo: programaCompilado.cuadruplos.length, memoria:{enteros:100000,booleanos:3000000}};
%}
				| ID '(' ID ')'
%{
	procActual = $1;
	if ( dirproc[procActual] !== undefined && dirproc[procActual].cuadruplo !== undefined){
	    errores.push({message:"El procedimiento '"+procActual+"' ya fue definido.",lineNo:llamada.linea});
	}
	//agregar procedimiento al directorio de procedimientos
	dirproc[procActual]={parametro:{id:$3,dir:100000},cuadruplo: programaCompilado.cuadruplos.length, memoria:{enteros:100001,booleanos:3000000}};
%}
				;
firmaprot:			  ID
%{
	procActual = $1;
    	// Verificar que su id no este repetido
	if ( dirproc[procActual] !== undefined){
	    errores.push({message:"El procedimiento '"+procActual+"' ya fue definido.",lineNo:llamada.linea});
	}	
	//agregar procedimiento al directorio de procedimientos
	dirproc[procActual]={parametro:undefined,cuadruplo: undefined, memoria:{enteros:100000,booleanos:3000000}};
%}
				| ID '(' ID ')'
%{
	procActual = $1;
	if ( dirproc[procActual] !== undefined){
	    errores.push({message:"El procedimiento '"+procActual+"' ya fue definido.",lineNo:llamada.linea});
	}
	//agregar procedimiento al directorio de procedimientos
	dirproc[procActual]={parametro:{id:$3,dir:100000},cuadruplo: undefined, memoria:{enteros:100001,booleanos:3000000}};
%}

;


estatuto:		  APAGATE
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["END"],"","",""]);
%}
				| GIRA_IZQUIERDA
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["GIRA_IZQ"],"","",""]);
%}
				| AVANZA
%{
	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	cuadruplos.push([commands["AVANZA"],"","",""]);
%}
				| COGE_ZUMBADOR
%{
	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	cuadruplos.push([commands["COGE_ZUM"],"","",""]);
%}
				| DEJA_ZUMBADOR
%{
	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	cuadruplos.push([commands["DEJA_ZUM"],"","",""]);
%}
				| BREAK
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["RETURN"],"","",""]);
%}
				| llamada
				| si
				| mientras
				| repetir
				| INICIO bloque FIN
				;
estatutog:		  /* vacio */
			| estatuto
			;
bloque:			estatutog PUNTOCOMA bloque | estatutog
			;

llamada:		  ID
%{
	//checar que el procedimiento exista
	if (dirproc[$1]===undefined){
		errores.push({message:"El procedimiento '"+$1+"' no ha sido definido",lineNo:yylineno+1});
	}else if (dirproc[$1].parametro!==undefined){ //checar que este procedimiento no necesite parametro
		errores.push({message:"El procedimiento '"+$1+"' lleva parametro",lineNo:yylineno+1});
	} else{	    	
    		if ( dirproc[$1].cuadruplo !== undefined && $1 != procActual ){
			cuadruplos.push([commands["ERA"],dirproc[$1].memoria.enteros,dirproc[$1].memoria.booleanos,""]);
			cuadruplos.push([commands["GOSUB"], dirproc[$1].cuadruplo,"",""]);
		} else {
			cuadruplos.push([commands["ERA"],"","",""]);
			llamadas.push({id:$1,idvar:undefined,linea:yylineno+1,cuadruplo:cuadruplos.length});
			cuadruplos.push([commands["GOSUB"],"","",""]);
		}
	}
%}
				| ID '(' expresionentera ')'
%{
    
	if (dirproc[$1]===undefined){//checar que el procedimiento exista
		errores.push({message:"El procedimiento '"+$1+"' no ha sido definido.",lineNo:yylineno+1});
	}else if (dirproc[$1].parametro===undefined){ //checar que este procedimiento necesite parametro
		errores.push({message:"El procedimiento '"+$1+"' no lleva parametro.",lineNo:yylineno+1});
	}else {
	    	cuadruplos.push([commands["PARAM"],POperandos.pop(),"",""]);
		cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    		if ( dirproc[$1].cuadruplo !== undefined && $1 != procActual){
			cuadruplos.push([commands["ERA"],dirproc[$1].memoria.enteros,dirproc[$1].memoria.booleanos,""]);
			cuadruplos.push([commands["GOSUB"], dirproc[$1].cuadruplo,dirproc[$1].parametro.dir,""]);
		} else {
			cuadruplos.push([commands["ERA"],"","",""]);
			llamadas.push({id:$1,idvar:$3,linea:yylineno+1,cuadruplo:cuadruplos.length});
			cuadruplos.push([commands["GOSUB"],"","",""]);
		}
	}
%}
				;

sicondicion: SI condicion
%{
    cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    PSaltos.push(cuadruplos.length);
    cuadruplos.push([commands["GOTOF"],POperandos.pop(),"",""]);
%}
    	;
sino: SINO
%{
    cuadruplos.push([commands["GOTO"],"","",""]);
    gotof = PSaltos.pop();
    cuadruplos[gotof][3]= cuadruplos.length;
    PSaltos.push(cuadruplos.length-1);
%}
	;
si:				sicondicion ENTONCES estatuto
%{
    gotof = PSaltos.pop();
    cuadruplos[gotof][3] = cuadruplos.length;
%}
				|sicondicion ENTONCES estatuto sino estatuto
%{
	salto = PSaltos.pop();
    	cuadruplos[salto][3] = cuadruplos.length;	    
%}
	;
mientrast: MIENTRAS
%{
    	PSaltos.push(cuadruplos.length);
%}
    	;
mientrasc: mientrast condicion HACER
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
    	PSaltos.push(cuadruplos.length);
  	cuadruplos.push([commands["GOTOF"],POperandos.pop(),"",""]);  	
%}
	;
mientras:		mientrasc estatuto
%{
    	gotof = PSaltos.pop();
	loop = PSaltos.pop();
	cuadruplos.push([commands["GOTO"],"","",loop]);
	cuadruplos[gotof][3]=cuadruplos.length;
%}
				;
repite: REPITE expresionentera VECES
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
repetir:		repite	estatuto
%{
    	gotof = PSaltos.pop();
	loop = PSaltos.pop();
	cuadruplos.push([commands["GOTO"],"","",loop]);
	cuadruplos[gotof][3]=cuadruplos.length;
%}
				;

expresionentera:  DECIMAL 
%{ 
        POperandos.push("#"+$1);
%}
				| ID
%{
	if ( dirproc[procActual].parametro.id !== $1)
		errores.push({message:"error, la variable '"+$1+"' no existe en ese contexto",lineNo:yylineno+1});
	else
	  POperandos.push(dirproc[procActual].parametro.dir);
%}
				| PRECEDE '(' expresionentera ')'
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["PRED"],POperandos.pop() ,"",dirproc[procActual].memoria.enteros++]);
	POperandos.push(dirproc[procActual].memoria.enteros-1);
%}
				| SUCEDE '(' expresionentera ')'
%{
    	cuadruplos.push([commands["STEP"],"","",yylineno+1]);
	cuadruplos.push([commands["SUCC"],POperandos.pop() ,"",dirproc[procActual].memoria.enteros++]);
	POperandos.push(dirproc[procActual].memoria.enteros-1);
%}				
				;
clausulayaux: clausulaY OR { POperadores.push(commands["OR"]); }
	;
	
condicion: 		  clausulaY             
				| clausulayaux condicion
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
				
clausulanoaux: clausulaNO AND { POperadores.push(commands["AND"]); }
	;

clausulaY:         clausulaNO
		| clausulanoaux clausulaY
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
	 
not: NO { POperadores.push(commands["NOT"]); }
	;
clausulaNO: not clausulaatomica
%{ 
	operador = POperadores.pop();
	 if ( operador === commands["NOT"]){ 
             cuadruplos.push([operador,POperandos.pop() ,"",dirproc[procActual].memoria.booleanos++]);
             POperandos.push(dirproc[procActual].memoria.booleanos-1);
         }else{
             POperadores.push(operador);
         }
%}
          | clausulaatomica
          ;
	  
parentesisabre: '(' { POperadores.push('(');/*Poner fondo falso '('*/ }
		;
		
clausulaatomica:  ES_CERO '(' expresionentera ')'
%{
	cuadruplos.push([commands["ES_CERO"],POperandos.pop() ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
				| booleano
				| parentesisabre condicion ')'  {	POperadores.pop(); /*Quitar fondo falso '('*/}
				;

booleano: FRENTE_LIBRE
%{
	cuadruplos.push([commands["FRENTE_LIB"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | FRENTE_BLOQUEADO
%{
	cuadruplos.push([commands["FRENTE_BLO"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | IZQUIERDA_LIBRE
%{
	cuadruplos.push([commands["IZQ_LIB"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | IZQUIERDA_BLOQUEADA
%{
	cuadruplos.push([commands["IZQ_BLO"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | DERECHA_LIBRE
%{
	cuadruplos.push([commands["DER_LIB"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | DERECHA_BLOQUEADA
%{
	cuadruplos.push([commands["DER_BLO"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | JUNTO_A_ZUMBADOR
%{
	cuadruplos.push([commands["JUNTO_ZUM"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | ZUMBADOR_EN_MOCHILA
%{
	cuadruplos.push([commands["ZUM_MOCHILA"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | ORIENTADO_AL_NORTE
%{
	cuadruplos.push([commands["NORTE"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | ORIENTADO_AL_SUR
%{
	cuadruplos.push([commands["SUR"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | ORIENTADO_AL_ESTE
%{
	cuadruplos.push([commands["ESTE"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        | ORIENTADO_AL_OESTE
%{
	cuadruplos.push([commands["OESTE"],"" ,"",dirproc[procActual].memoria.booleanos++]);
	POperandos.push(dirproc[procActual].memoria.booleanos-1);
%}
        ;