/**
 * ============
 * Karel online
 * ============
 * Variables y funciones utilizadas para la compilacion de un codigo fuente. 
 * Autor: Montserrat Gonzalez Arenas
 * Fecha: Mayo/1/2011
 */
//Objeto que contiene las variables y las funciones para ejecutar cuadruplos.
var maquinavirtual= (function(){
var helper = {
//Modos en los que puede estar la maquina virtual
//notready: no se han inicializado las variables ni cargado los cuadruplos
//ready: listo para ejecutar el cuadruplo siguiente
//running: ejecucion continua de cuadruplos
karelmodes: {notready:0,ready:1,running:2} 
,mode: 0 //Modo de ejecucion actual//Objeto que contiene las variables y las funciones para compilar
,timer: undefined //Objeto timer que ejecuta el cuadruplo siguiente despues de un delay
,delay: undefined //Retraso en ms para la ejecucion de cuadruplos
,karelx:0 //Posicion X de karel
,karely:0 //Posicion Y de karel
,orientacion:{norte:0,sur:2,este:3,oeste:1}
,karelo:0 //Orientacion de karel
,mochila:0
,PC: 0
,currentLine: 0
,cuadruplos: undefined
,mundo: undefined //Mundo en el que se esta ejecutando karel
,commands: undefined // Codificacion utilizada para las acciones de la maquina virtual
,callStack: undefined //Array para guardar los cambios de contexto.
,memoria: undefined //Array de la memoria real
,mapMemoria:undefined //Array de la asociacion de las direcciones virtuales y las direcciones reales en memoria
,getMemory: function (dir){ //Obtener el valor almacenado en memoria real dando como parametro una direccion virtual
    return this.memoria[this.mapMemoria[String(dir)]];
}
,setMemory: function (dir,value){ // Asignar un valor en memoria real dando como parametro una direccion virtual y un valor.
    this.memoria[ this.mapMemoria[String(dir)]] = value;
}
,loadProc: function (enteros,booleanos){//Generar los nuevos espacios en memoria real y cambiar el maping de la memoria virtual.
	memoriaTotal = enteros- 100000 + booleanos - 3000000;
	if( memoriaTotal > 0){
		this.mapMemoria = new Object();
		for ( var i= 100000; i< enteros ; i++){
			this.mapMemoria[String(i)] = this.memoria.length;
		this.memoria.push(0);
		}
		for ( var i= 3000000; i< booleanos ; i++){
			this.mapMemoria[String(i)] = this.memoria.length;
		this.memoria.push(false);
		}
	}
}
,freeMemory: function (){
	//Force garbage collector to free memory
	this.memoria = undefined;
	this.mapMemoria = undefined;
	this.callStack = undefined;
	this.cuadruplos = undefined;
	this.mundo = undefined;
	this.commands = undefined;
}
,verificaPared: function (orientacion,mundo){
	switch ( orientacion ){
		case this.orientacion.norte:
			//orientado al norte
			return this.mundo.paredes.get(this.karelx-1,this.karely,"horizontal",1);
		case this.orientacion.sur:
			//orientado al sur
			return this.mundo.paredes.get(this.karelx-1,this.karely-1,"horizontal",0);
		case this.orientacion.este:
			//orientado al este
			return this.mundo.paredes.get(this.karelx,this.karely-1,"vertical",1);
		case this.orientacion.oeste:
			//orientadp al oeste
			return this.mundo.paredes.get(this.karelx-1,this.karely-1,"vertical",0);
	}
}
,error: undefined
,initialize: function (cuadruplos,commands,mundo){
	if( cuadruplos === undefined){
		this.error = KAREL.localization.$errorNoCompiled;
		return 1;
	}
	this.cuadruplos = cuadruplos;
	this.commands = commands;
	this.mundo = mundo;
	this.PC = 0;
	this.karely = mundo.karelY;
	this.karelx = mundo.karelX;
	this.mochila = mundo.zumbadores.enMochila;
	this.karelo = this.orientacion[mundo.orientacion];
	this.memoria = new Array();
	this.mapMemoria = new Array();
	this.callStack = new Array();
	return 0;
	
}
,execute: function (){
	if ( this.mode == this.karelmodes.notready){
		this.error = "No se ha inicializado la ejecución. Haga click en el boton de inicializar.";
		return 1;
	}
	while( true ){
		cuadruplo = this.cuadruplos[this.PC];
		switch( cuadruplo[0] ){
			case this.commands.GOTO:
				this.PC = Number(cuadruplo[3]);
				break;
			case this.commands.GOTOF:
				if ( this.getMemory(Number(cuadruplo[1])) == true){
					this.PC++;
				} else {
					this.PC = Number(cuadruplo[3]);
				}
				break;
			case this.commands.GOSUB:
				this.callStack.push({pc: this.PC + 1,memoria: memoriaVieja,fin:fin}); 
				memoriaVieja = undefined;
				if(cuadruplo[2] != ""){
					this.setMemory(Number(cuadruplo[2]),parametro); 
				}
				this.PC = cuadruplo[1];
				break;
			case this.commands.PARAM:
				if( isNaN(cuadruplo[1])){
					parametro = Number(cuadruplo[1].substring(1));
				}else{
					parametro = this.getMemory(Number(cuadruplo[1]));
				}
				this.PC++;
				break;
			case this.commands.ERA:
				memoriaVieja = this.mapMemoria;
				fin = this.memoria.length;
				this.loadProc(Number(cuadruplo[1]),Number(cuadruplo[2]));
				this.PC++;
				break;
			case this.commands.END:
				this.freeMemory();
				return 0;
				break;
			case this.commands.AVANZA:
				if ( this.verificaPared(this.karelo) ){
					this.error = KAREL.localization.$errorWallCrash;
					this.freeMemory();
					return 1;
				} else {
				switch( this.karelo){
					case this.orientacion.norte:
						this.karely++;
						break;
					case this.orientacion.sur:
						this.karely--;
						break;
					case this.orientacion.este:
						this.karelx++;
						break;
					case this.orientacion.oeste:
						this.karelx--;
						break;
				}
				this.mundo.setPosicion(this.karelx,this.karely);
				}
				this.PC++;
				break;
			case this.commands.GIRA_IZQ:
				this.karelo = (this.karelo+1)%4;
				switch( this.karelo){
					case this.orientacion.norte:
						this.mundo.setOrientacion("norte");
						break;
					case this.orientacion.sur:
						this.mundo.setOrientacion("sur");
						break;
					case this.orientacion.este:
						this.mundo.setOrientacion("este");
						break;
					case this.orientacion.oeste:
						this.mundo.setOrientacion("oeste");
						break;
				}
				// cambiar orientacion de karel
				this.PC++;
				break;
			case this.commands.DEJA_ZUM:
				if ( this.mochila > 0 ){
					this.mochila--;
					this.mundo.setMochila(this.mochila);
					zumbadores = Number(this.mundo.zumbadores.get(this.karelx,this.karely)) + 1;
					this.mundo.zumbadores.poner(this.karelx,this.karely,zumbadores);
				}else{
					this.error = KAREL.localization.$errorPutBeeper;
					this.freeMemory();
					return 1;
				}
				this.PC++;
				break;
			case this.commands.COGE_ZUM:
				zumbadores = Number(this.mundo.zumbadores.get(this.karelx,this.karely));
				if( zumbadores > 0 ){
					zumbadores--;
					this.mochila++;
					this.mundo.setMochila(this.mochila);
					this.mundo.zumbadores.poner(this.karelx,this.karely,zumbadores);
				}else{
					this.error = KAREL.localization.$errorPickBeeper;
					this.freeMemory();
					return 1;
				}
				this.PC++;
				break;
			case this.commands.AND:
				op1 = this.getMemory(Number( cuadruplo[1]));
				op2 = this.getMemory(Number( cuadruplo[2]));
				this.setMemory(Number(cuadruplo[3]),op1&&op2);
				this.PC++;
				break;
			case this.commands.OR:
				op1 = this.getMemory(Number(cuadruplo[1]));
				op2 = this.getMemory(Number(cuadruplo[2]));
				this.setMemory(Number(cuadruplo[3]),op1||op2);
				this.PC++;
				break;
			case this.commands.NOT:
				op1 = this.getMemory( Number(cuadruplo[1]));
				this.setMemory(Number(cuadruplo[3]),!op1);
				this.PC++;
				break;
			case this.commands.PRED:
				if( isNaN(cuadruplo[1])){
					this.setMemory(Number(cuadruplo[3]), Number(cuadruplo[1].substring(1))-1);
				}else{
					var n = this.getMemory(Number(cuadruplo[1]));
					this.setMemory(Number(cuadruplo[3]), n-1);
				}
				this.PC++;
				break;
			case this.commands.SUCC:
				if( isNaN(cuadruplo[1])){
					this.setMemory(Number(cuadruplo[3]), Number(cuadruplo[1].substring(1))+1);
				}else{
					this.setMemory(Number(cuadruplo[3]), this.getMemory(cuadruplo[1])+1);
				}
				this.PC++;
				break;
			case this.commands.ES_CERO:
				var n;
				if( isNaN(cuadruplo[1])){
				n = Number(cuadruplo[1].substring(1));
				}else{
					n = this.getMemory(Number(cuadruplo[1]));
				}
				if (n != 0 ){
				this.setMemory(Number(cuadruplo[3]),false);
				}else{
					this.setMemory(Number(cuadruplo[3]),true);
				}
				this.PC++;
				break;
			case this.commands.FRENTE_LIB:
				if ( this.verificaPared( this.karelo) ){
					this.setMemory(Number(cuadruplo[3]),false);
				}else{
					this.setMemory(Number(cuadruplo[3]), true);
				}
				this.PC++;
				break;
			case this.commands.FRENTE_BLO:
				this.setMemory(Number(cuadruplo[3]), this.verificaPared(this.karelo));
				this.PC++;
				break;
			case this.commands.IZQ_LIB:
				if ( this.verificaPared( (this.karelo + 1)%4 ,mundo) ){
					this.setMemory(Number(cuadruplo[3]),false);
				}else{
					this.setMemory(Number(cuadruplo[3]), true);
				}
				this.PC++;
				break;
			case this.commands.IZQ_BLO:
				this.setMemory(Number(cuadruplo[3]), this.verificaPared((this.karelo + 1)%4));
				this.PC++;
				break;
			case this.commands.DER_LIB:
				if ( this.verificaPared( (this.karelo + 3)%4 ) ){
					this.setMemory(Number(cuadruplo[3]),false);
				}else{
					this.setMemory(Number(cuadruplo[3]), true);
				}
				this.PC++;
				break;
			case this.commands.DER_BLO:
				this.setMemory(Number(cuadruplo[3]), this.verificaPared((this.karelo + 3)%4));  
				this.PC++;
				break;
			case this.commands.JUNTO_ZUM:
				zumbadores = Number(this.mundo.zumbadores.get(this.karelx,this.karely));
				if( zumbadores > 0 ){
					this.setMemory( Number(cuadruplo[3]),true); 
				}else{
					this.setMemory( Number(cuadruplo[3]),false);
				}
				this.PC++;
				break;
			case this.commands.ZUM_MOCHILA:
				if ( this.mochila > 0){
					this.setMemory( Number(cuadruplo[3]),true); 
				}else{
					this.setMemory( Number(cuadruplo[3]),false);
				}
				this.PC++;
				break;
			case this.commands.NORTE:
				if ( this.karelo == this.orientacion["norte"]){
					this.setMemory( Number(cuadruplo[3]),true); 
				}else{
					this.setMemory( Number(cuadruplo[3]),false);
				}
				this.PC++;
				break;
			case this.commands.SUR:
				if (this.karelo == this.orientacion["sur"]){
					this.setMemory( Number(cuadruplo[3]),true);
				}else{
					this.setMemory( Number(cuadruplo[3]),false);
				}
				this.PC++;
				break;
			case this.commands.ESTE:
			    if ( this.karelo == this.orientacion["este"]){
					this.setMemory( Number(cuadruplo[3]),true);
				}else{
					this.setMemory( Number(cuadruplo[3]),false);
				}
				this.PC++;
				break;
			case this.commands.OESTE:
				if ( this.karelo == this.orientacion["oeste"]){
					this.setMemory( Number(cuadruplo[3]),true); 
				}else{
					this.setMemory( Number(cuadruplo[3]),false);
				}
				this.PC++;
				break;
			case this.commands.RETURN:
				if( this.callStack.length > 0 ){
					procanterior = this.callStack.pop();
					this.memoria.splice(procanterior.fin, (this.memoria.length -procanterior.fin));
					this.PC = procanterior.pc;
					this.mapMemoria = procanterior.memoria;
				}else{  
					this.freeMemory();
					return 0;
				}
				break;
			case this.commands.STEP:
				this.currentLine = Number(cuadruplo[3]);
				if (this.mode !== this.karelmodes.running || KAREL.compilador.retraso !== 0) {
					KAREL.utils.highlightLine(this.currentLine);
				}
				this.PC++;
				return 2;
				break;
		}
	}
}
};
return helper; 
})();