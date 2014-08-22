/**
 * ============
 * Karel online
 * ============
 * Variables y funciones utilizadas para la compilacion de un codigo fuente. 
 * Autor: Montserrat Gonzalez Arenas
 * Fecha: Mayo/1/2011
 */
var programaCompilado= (function(){//Objeto que contiene las variables y las funciones para compilar.
var helper = {
//Codigo fuente que sera compilado y al que corresponden los cuadruplos
fuente: ""
//Arreglo de Arreglos de 4, contiene los cuadruplos generados por el parser
,cuadruplos: undefined
//Directorio de procedimientos. 
//Objeto con la estructura {parametro:{id:String,dir:Integer},cuadruplo:Integer,memoria:{enteros:Integer,booleanos:Integer}}
,dirproc: undefined
//Objeto que contiene la codificacion de los comandos de la maquina virtual.
,commands:{ GOTO:500,
GOTOF:501,
GOSUB:503,
PARAM:504,
ERA:506,
END:507,
AVANZA:508,
GIRA_IZQ:509,
DEJA_ZUM:510,
COGE_ZUM:511,
AND:512,
OR:513,
NOT:514,
PRED:515,
SUCC:516,
ES_CERO:517,
FRENTE_LIB:518,
FRENTE_BLO:519,
IZQ_LIB:520,
IZQ_BLO:521,
DER_LIB:522,
DER_BLO:523,
JUNTO_ZUM:524,
ZUM_MOCHILA:525,
NORTE:526,
SUR:527,
ESTE:528,
OESTE:529,
RETURN:530,
STEP:531}
//errores almacena Strings que contienen los errores generados por el parser
,errores: new Array()
/*Funcion que obtiene el programa compilado. 
Recibe como parametro un parser que puede ser el de java o el de pascal.
Al terminar la variable cuadruplos tendra los cuadruplos correspondientes.
programaCompilado.get(parser) lo utiliza unicamente la funcion compila() en editor.html
*/
,get: function (parserkarel){ 
//Inicializacion de variables
    	this.cuadruplos= new Array();
	this.errores = new Array();
	this.dirproc= new Object();
//Generar los cuadruplos de acuerdo al parser
	parserkarel.parse(this.fuente);	
//Liberar la memoria de dirproc
	this.dirproc = undefined; 
	}
};
return helper; 
})();

//Para NodeJS
if (typeof exports !== "undefined") {
	exports.programaCompilado = programaCompilado;
}