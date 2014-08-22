/* Jison generated parser */
var paskarel = (function(){
var parser = {trace: 
function trace() {
}
,
yy: {},
symbols_: {"error":2,"inicio":3,"INICIAR_PROGRAMA":4,"ejecucion":5,"procedimientos":6,"INICIA_EJECUCION":7,"programa":8,"bloque":9,"TERMINA_EJECUCION":10,"FINALIZAR_PROGRAMA":11,"EOF":12,"procedimiento":13,"PUNTOCOMA":14,"prototipo":15,"DEFINE":16,"firmaproc":17,"COMO":18,"estatuto":19,"DEFINE_PROTOTIPO":20,"firmaprot":21,"ID":22,"(":23,")":24,"APAGATE":25,"GIRA_IZQUIERDA":26,"AVANZA":27,"COGE_ZUMBADOR":28,"DEJA_ZUMBADOR":29,"BREAK":30,"llamada":31,"si":32,"mientras":33,"repetir":34,"INICIO":35,"FIN":36,"estatutog":37,"expresionentera":38,"sicondicion":39,"SI":40,"condicion":41,"sino":42,"SINO":43,"ENTONCES":44,"mientrast":45,"MIENTRAS":46,"mientrasc":47,"HACER":48,"repite":49,"REPITE":50,"VECES":51,"DECIMAL":52,"PRECEDE":53,"SUCEDE":54,"clausulayaux":55,"clausulaY":56,"OR":57,"clausulanoaux":58,"clausulaNO":59,"AND":60,"not":61,"NO":62,"clausulaatomica":63,"parentesisabre":64,"ES_CERO":65,"booleano":66,"FRENTE_LIBRE":67,"FRENTE_BLOQUEADO":68,"IZQUIERDA_LIBRE":69,"IZQUIERDA_BLOQUEADA":70,"DERECHA_LIBRE":71,"DERECHA_BLOQUEADA":72,"JUNTO_A_ZUMBADOR":73,"ZUMBADOR_EN_MOCHILA":74,"ORIENTADO_AL_NORTE":75,"ORIENTADO_AL_SUR":76,"ORIENTADO_AL_ESTE":77,"ORIENTADO_AL_OESTE":78,"$accept":0,"$end":1},
terminals_: {2:"error",4:"INICIAR_PROGRAMA",7:"INICIA_EJECUCION",10:"TERMINA_EJECUCION",11:"FINALIZAR_PROGRAMA",12:"EOF",14:"PUNTOCOMA",16:"DEFINE",18:"COMO",20:"DEFINE_PROTOTIPO",22:"ID",23:"(",24:")",25:"APAGATE",26:"GIRA_IZQUIERDA",27:"AVANZA",28:"COGE_ZUMBADOR",29:"DEJA_ZUMBADOR",30:"BREAK",35:"INICIO",36:"FIN",40:"SI",43:"SINO",44:"ENTONCES",46:"MIENTRAS",48:"HACER",50:"REPITE",51:"VECES",52:"DECIMAL",53:"PRECEDE",54:"SUCEDE",57:"OR",60:"AND",62:"NO",65:"ES_CERO",67:"FRENTE_LIBRE",68:"FRENTE_BLOQUEADO",69:"IZQUIERDA_LIBRE",70:"IZQUIERDA_BLOQUEADA",71:"DERECHA_LIBRE",72:"DERECHA_BLOQUEADA",73:"JUNTO_A_ZUMBADOR",74:"ZUMBADOR_EN_MOCHILA",75:"ORIENTADO_AL_NORTE",76:"ORIENTADO_AL_SUR",77:"ORIENTADO_AL_ESTE",78:"ORIENTADO_AL_OESTE"},
productions_: [0,[3,1],[5,2],[8,6],[6,0],[6,3],[6,2],[13,4],[15,3],[17,1],[17,4],[21,1],[21,4],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,3],[37,0],[37,1],[9,3],[9,1],[31,1],[31,4],[39,2],[42,1],[32,3],[32,5],[45,1],[47,3],[33,2],[49,3],[34,2],[38,1],[38,1],[38,4],[38,4],[55,2],[41,1],[41,2],[58,2],[56,1],[56,2],[61,1],[59,2],[59,1],[64,1],[63,4],[63,1],[63,3],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1],[66,1]],
performAction: 
function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
    var $0 = $$.length - 1;
    switch (yystate) {
      case 1:
        POperandos = new Array();
        POperadores = new Array();
        PSaltos = new Array();
        llamadas = new Array();
        dirproc = programaCompilado.dirproc;
        cuadruplos = programaCompilado.cuadruplos;
        constantes = programaCompilado.constantes;
        errores = programaCompilado.errores;
        commands = programaCompilado.commands;
        cuadruplos.push([commands["ERA"], "", "", ""]);
        cuadruplos.push([commands["GOTO"], "", "", ""]);
        break;
      case 2:
        procActual = $$[$0];
        dirproc[procActual] = {parametro:undefined, cuadruplo:cuadruplos.length, memoria:{enteros:100000, booleanos:3000000}};
        break;
      case 3:
        cuadruplos[0][1] = dirproc["inicia-ejecucion"].memoria.enteros;
        cuadruplos[0][2] = dirproc["inicia-ejecucion"].memoria.booleanos;
        cuadruplos[1][3] = dirproc["inicia-ejecucion"].cuadruplo;
        for (i = 0; i < llamadas.length; i++) {
            llamada = llamadas[i];
            if (dirproc[llamada.id].cuadruplo === undefined) {
                errores.push({message:"El procedimiento '" + llamada.id + "' no fue definido.", lineNo:llamada.linea});
            } else {
                cuadruplos[llamada.cuadruplo][1] = dirproc[llamada.id].cuadruplo;
                if (llamada.idvar !== undefined) {
                    cuadruplos[llamada.cuadruplo][2] = dirproc[llamada.id].parametro.dir;
                }
                cuadruplos[llamada.cuadruplo - 1][1] = dirproc[llamada.id].memoria.enteros;
                cuadruplos[llamada.cuadruplo - 1][2] = dirproc[llamada.id].memoria.booleanos;
            }
        }
        break;
      case 7:
        cuadruplos.push([commands["RETURN"], "", "", ""]);
        break;
      case 9:
        procActual = $$[$0];
        if (dirproc[procActual] !== undefined && dirproc[procActual].cuadruplo !== undefined) {
            errores.push({message:"El procedimiento '" + procActual + "' ya fue definido.", lineNo:llamada.linea});
        }
        dirproc[procActual] = {parametro:undefined, cuadruplo:programaCompilado.cuadruplos.length, memoria:{enteros:100000, booleanos:3000000}};
        break;
      case 10:
        procActual = $$[$0 - 3];
        if (dirproc[procActual] !== undefined && dirproc[procActual].cuadruplo !== undefined) {
            errores.push({message:"El procedimiento '" + procActual + "' ya fue definido.", lineNo:llamada.linea});
        }
        dirproc[procActual] = {parametro:{id:$$[$0 - 1], dir:100000}, cuadruplo:programaCompilado.cuadruplos.length, memoria:{enteros:100001, booleanos:3000000}};
        break;
      case 11:
        procActual = $$[$0];
        if (dirproc[procActual] !== undefined) {
            errores.push({message:"El procedimiento '" + procActual + "' ya fue definido.", lineNo:llamada.linea});
        }
        dirproc[procActual] = {parametro:undefined, cuadruplo:undefined, memoria:{enteros:100000, booleanos:3000000}};
        break;
      case 12:
        procActual = $$[$0 - 3];
        if (dirproc[procActual] !== undefined) {
            errores.push({message:"El procedimiento '" + procActual + "' ya fue definido.", lineNo:llamada.linea});
        }
        dirproc[procActual] = {parametro:{id:$$[$0 - 1], dir:100000}, cuadruplo:undefined, memoria:{enteros:100001, booleanos:3000000}};
        break;
      case 13:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["END"], "", "", ""]);
        break;
      case 14:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["GIRA_IZQ"], "", "", ""]);
        break;
      case 15:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["AVANZA"], "", "", ""]);
        break;
      case 16:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["COGE_ZUM"], "", "", ""]);
        break;
      case 17:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["DEJA_ZUM"], "", "", ""]);
        break;
      case 18:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["RETURN"], "", "", ""]);
        break;
      case 28:
        if (dirproc[$$[$0]] === undefined) {
            errores.push({message:"El procedimiento '" + $$[$0] + "' no ha sido definido", lineNo:yylineno + 1});
        } else {
            if (dirproc[$$[$0]].parametro !== undefined) {
                errores.push({message:"El procedimiento '" + $$[$0] + "' lleva parametro", lineNo:yylineno + 1});
            } else {
                if (dirproc[$$[$0]].cuadruplo !== undefined && $$[$0] != procActual) {
                    cuadruplos.push([commands["ERA"], dirproc[$$[$0]].memoria.enteros, dirproc[$$[$0]].memoria.booleanos, ""]);
                    cuadruplos.push([commands["GOSUB"], dirproc[$$[$0]].cuadruplo, "", ""]);
                } else {
                    cuadruplos.push([commands["ERA"], "", "", ""]);
                    llamadas.push({id:$$[$0], idvar:undefined, linea:yylineno + 1, cuadruplo:cuadruplos.length});
                    cuadruplos.push([commands["GOSUB"], "", "", ""]);
                }
            }
        }
        break;
      case 29:
        if (dirproc[$$[$0 - 3]] === undefined) {
            errores.push({message:"El procedimiento '" + $$[$0 - 3] + "' no ha sido definido.", lineNo:yylineno + 1});
        } else {
            if (dirproc[$$[$0 - 3]].parametro === undefined) {
                errores.push({message:"El procedimiento '" + $$[$0 - 3] + "' no lleva parametro.", lineNo:yylineno + 1});
            } else {
                cuadruplos.push([commands["PARAM"], POperandos.pop(), "", ""]);
                cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
                if (dirproc[$$[$0 - 3]].cuadruplo !== undefined && $$[$0 - 3] != procActual) {
                    cuadruplos.push([commands["ERA"], dirproc[$$[$0 - 3]].memoria.enteros, dirproc[$$[$0 - 3]].memoria.booleanos, ""]);
                    cuadruplos.push([commands["GOSUB"], dirproc[$$[$0 - 3]].cuadruplo, dirproc[$$[$0 - 3]].parametro.dir, ""]);
                } else {
                    cuadruplos.push([commands["ERA"], "", "", ""]);
                    llamadas.push({id:$$[$0 - 3], idvar:$$[$0 - 1], linea:yylineno + 1, cuadruplo:cuadruplos.length});
                    cuadruplos.push([commands["GOSUB"], "", "", ""]);
                }
            }
        }
        break;
      case 30:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["GOTOF"], POperandos.pop(), "", ""]);
        break;
      case 31:
        cuadruplos.push([commands["GOTO"], "", "", ""]);
        gotof = PSaltos.pop();
        cuadruplos[gotof][3] = cuadruplos.length;
        PSaltos.push(cuadruplos.length - 1);
        break;
      case 32:
        gotof = PSaltos.pop();
        cuadruplos[gotof][3] = cuadruplos.length;
        break;
      case 33:
        salto = PSaltos.pop();
        cuadruplos[salto][3] = cuadruplos.length;
        break;
      case 34:
        PSaltos.push(cuadruplos.length);
        break;
      case 35:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["GOTOF"], POperandos.pop(), "", ""]);
        break;
      case 36:
        gotof = PSaltos.pop();
        loop = PSaltos.pop();
        cuadruplos.push([commands["GOTO"], "", "", loop]);
        cuadruplos[gotof][3] = cuadruplos.length;
        break;
      case 37:
        cuadruplos.push([commands["SUCC"], POperandos.pop(), "", dirproc[procActual].memoria.enteros++]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["PRED"], dirproc[procActual].memoria.enteros - 1, "", dirproc[procActual].memoria.enteros - 1]);
        cuadruplos.push([commands["ES_CERO"], dirproc[procActual].memoria.enteros - 1, "", dirproc[procActual].memoria.booleanos++]);
        cuadruplos.push([commands["NOT"], dirproc[procActual].memoria.booleanos - 1, "", dirproc[procActual].memoria.booleanos++]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["GOTOF"], dirproc[procActual].memoria.booleanos - 1, "", ""]);
        break;
      case 38:
        gotof = PSaltos.pop();
        loop = PSaltos.pop();
        cuadruplos.push([commands["GOTO"], "", "", loop]);
        cuadruplos[gotof][3] = cuadruplos.length;
        break;
      case 39:
        POperandos.push("#" + $$[$0]);
        break;
      case 40:
        if (dirproc[procActual].parametro.id !== $$[$0]) {
            errores.push({message:"error, la variable '" + $$[$0] + "' no existe en ese contexto", lineNo:yylineno + 1});
        } else {
            POperandos.push(dirproc[procActual].parametro.dir);
        }
        break;
      case 41:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["PRED"], POperandos.pop(), "", dirproc[procActual].memoria.enteros++]);
        POperandos.push(dirproc[procActual].memoria.enteros - 1);
        break;
      case 42:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["SUCC"], POperandos.pop(), "", dirproc[procActual].memoria.enteros++]);
        POperandos.push(dirproc[procActual].memoria.enteros - 1);
        break;
      case 43:
        POperadores.push(commands["OR"]);
        break;
      case 45:
        operador = POperadores.pop();
        if (operador === commands["OR"]) {
            cuadruplos.push([operador, POperandos.pop(), POperandos.pop(), dirproc[procActual].memoria.booleanos++]);
            POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        } else {
            POperadores.push(operador);
        }
        break;
      case 46:
        POperadores.push(commands["AND"]);
        break;
      case 48:
        operador = POperadores.pop();
        if (operador === commands["AND"]) {
            cuadruplos.push([operador, POperandos.pop(), POperandos.pop(), dirproc[procActual].memoria.booleanos++]);
            POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        } else {
            POperadores.push(operador);
        }
        break;
      case 49:
        POperadores.push(commands["NOT"]);
        break;
      case 50:
        operador = POperadores.pop();
        if (operador === commands["NOT"]) {
            cuadruplos.push([operador, POperandos.pop(), "", dirproc[procActual].memoria.booleanos++]);
            POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        } else {
            POperadores.push(operador);
        }
        break;
      case 52:
        POperadores.push("(");
        break;
      case 53:
        cuadruplos.push([commands["ES_CERO"], POperandos.pop(), "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 55:
        POperadores.pop();
        break;
      case 56:
        cuadruplos.push([commands["FRENTE_LIB"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 57:
        cuadruplos.push([commands["FRENTE_BLO"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 58:
        cuadruplos.push([commands["IZQ_LIB"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 59:
        cuadruplos.push([commands["IZQ_BLO"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 60:
        cuadruplos.push([commands["DER_LIB"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 61:
        cuadruplos.push([commands["DER_BLO"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 62:
        cuadruplos.push([commands["JUNTO_ZUM"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 63:
        cuadruplos.push([commands["ZUM_MOCHILA"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 64:
        cuadruplos.push([commands["NORTE"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 65:
        cuadruplos.push([commands["SUR"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 66:
        cuadruplos.push([commands["ESTE"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 67:
        cuadruplos.push([commands["OESTE"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
    }
}
,
table: [{8:1,3:2,4:[1,3]},{1:[3]},{5:4,6:5,7:[2,4],16:[2,4],20:[2,4]},{7:[2,1],16:[2,1],20:[2,1]},{9:6,37:7,19:8,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27],14:[2,24],10:[2,24]},{7:[1,28],13:29,15:30,16:[1,31],20:[1,32]},{10:[1,33]},{14:[1,34],10:[2,27],36:[2,27]},{14:[2,25],10:[2,25],36:[2,25]},{10:[2,13],14:[2,13],36:[2,13],43:[2,13]},{10:[2,14],14:[2,14],36:[2,14],43:[2,14]},{10:[2,15],14:[2,15],36:[2,15],43:[2,15]},{10:[2,16],14:[2,16],36:[2,16],43:[2,16]},{10:[2,17],14:[2,17],36:[2,17],43:[2,17]},{10:[2,18],14:[2,18],36:[2,18],43:[2,18]},{10:[2,19],14:[2,19],36:[2,19],43:[2,19]},{10:[2,20],14:[2,20],36:[2,20],43:[2,20]},{10:[2,21],14:[2,21],36:[2,21],43:[2,21]},{10:[2,22],14:[2,22],36:[2,22],43:[2,22]},{9:35,37:7,19:8,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27],14:[2,24],36:[2,24]},{23:[1,36],14:[2,28],10:[2,28],36:[2,28],43:[2,28]},{44:[1,37]},{19:38,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27]},{19:39,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27]},{41:40,56:41,55:42,59:43,58:44,61:45,63:46,62:[1,47],65:[1,48],66:49,64:50,67:[1,51],68:[1,52],69:[1,53],70:[1,54],71:[1,55],72:[1,56],73:[1,57],74:[1,58],75:[1,59],76:[1,60],77:[1,61],78:[1,62],23:[1,63]},{41:64,56:41,55:42,59:43,58:44,61:45,63:46,62:[1,47],65:[1,48],66:49,64:50,67:[1,51],68:[1,52],69:[1,53],70:[1,54],71:[1,55],72:[1,56],73:[1,57],74:[1,58],75:[1,59],76:[1,60],77:[1,61],78:[1,62],23:[1,63]},{38:65,52:[1,66],22:[1,67],53:[1,68],54:[1,69]},{62:[2,34],65:[2,34],67:[2,34],68:[2,34],69:[2,34],70:[2,34],71:[2,34],72:[2,34],73:[2,34],74:[2,34],75:[2,34],76:[2,34],77:[2,34],78:[2,34],23:[2,34]},{10:[2,2],14:[2,2],25:[2,2],26:[2,2],27:[2,2],28:[2,2],29:[2,2],30:[2,2],22:[2,2],40:[2,2],46:[2,2],50:[2,2],35:[2,2]},{14:[1,70]},{7:[2,6],16:[2,6],20:[2,6]},{17:71,22:[1,72]},{21:73,22:[1,74]},{11:[1,75]},{9:76,37:7,19:8,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27],14:[2,24],36:[2,24],10:[2,24]},{36:[1,77]},{38:78,52:[1,66],22:[1,67],53:[1,68],54:[1,69]},{19:79,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27]},{14:[2,36],10:[2,36],36:[2,36],43:[2,36]},{14:[2,38],10:[2,38],36:[2,38],43:[2,38]},{44:[2,30]},{57:[1,80],44:[2,44],48:[2,44],24:[2,44]},{41:81,56:41,55:42,59:43,58:44,61:45,63:46,62:[1,47],65:[1,48],66:49,64:50,67:[1,51],68:[1,52],69:[1,53],70:[1,54],71:[1,55],72:[1,56],73:[1,57],74:[1,58],75:[1,59],76:[1,60],77:[1,61],78:[1,62],23:[1,63]},{60:[1,82],44:[2,47],57:[2,47],48:[2,47],24:[2,47]},{56:83,59:43,58:44,61:45,63:46,62:[1,47],65:[1,48],66:49,64:50,67:[1,51],68:[1,52],69:[1,53],70:[1,54],71:[1,55],72:[1,56],73:[1,57],74:[1,58],75:[1,59],76:[1,60],77:[1,61],78:[1,62],23:[1,63]},{63:84,65:[1,48],66:49,64:50,67:[1,51],68:[1,52],69:[1,53],70:[1,54],71:[1,55],72:[1,56],73:[1,57],74:[1,58],75:[1,59],76:[1,60],77:[1,61],78:[1,62],23:[1,63]},{44:[2,51],60:[2,51],57:[2,51],48:[2,51],24:[2,51]},{65:[2,49],67:[2,49],68:[2,49],69:[2,49],70:[2,49],71:[2,49],72:[2,49],73:[2,49],74:[2,49],75:[2,49],76:[2,49],77:[2,49],78:[2,49],23:[2,49]},{23:[1,85]},{44:[2,54],57:[2,54],60:[2,54],48:[2,54],24:[2,54]},{41:86,56:41,55:42,59:43,58:44,61:45,63:46,62:[1,47],65:[1,48],66:49,64:50,67:[1,51],68:[1,52],69:[1,53],70:[1,54],71:[1,55],72:[1,56],73:[1,57],74:[1,58],75:[1,59],76:[1,60],77:[1,61],78:[1,62],23:[1,63]},{44:[2,56],60:[2,56],57:[2,56],48:[2,56],24:[2,56]},{44:[2,57],60:[2,57],57:[2,57],48:[2,57],24:[2,57]},{44:[2,58],60:[2,58],57:[2,58],48:[2,58],24:[2,58]},{44:[2,59],60:[2,59],57:[2,59],48:[2,59],24:[2,59]},{44:[2,60],60:[2,60],57:[2,60],48:[2,60],24:[2,60]},{44:[2,61],60:[2,61],57:[2,61],48:[2,61],24:[2,61]},{44:[2,62],60:[2,62],57:[2,62],48:[2,62],24:[2,62]},{44:[2,63],60:[2,63],57:[2,63],48:[2,63],24:[2,63]},{44:[2,64],60:[2,64],57:[2,64],48:[2,64],24:[2,64]},{44:[2,65],60:[2,65],57:[2,65],48:[2,65],24:[2,65]},{44:[2,66],60:[2,66],57:[2,66],48:[2,66],24:[2,66]},{44:[2,67],60:[2,67],57:[2,67],48:[2,67],24:[2,67]},{62:[2,52],65:[2,52],67:[2,52],68:[2,52],69:[2,52],70:[2,52],71:[2,52],72:[2,52],73:[2,52],74:[2,52],75:[2,52],76:[2,52],77:[2,52],78:[2,52],23:[2,52]},{48:[1,87]},{51:[1,88]},{51:[2,39],24:[2,39]},{51:[2,40],24:[2,40]},{23:[1,89]},{23:[1,90]},{7:[2,5],16:[2,5],20:[2,5]},{18:[1,91]},{23:[1,92],18:[2,9]},{14:[1,93]},{23:[1,94],14:[2,11]},{12:[1,95]},{10:[2,26],36:[2,26]},{10:[2,23],14:[2,23],36:[2,23],43:[2,23]},{24:[1,96]},{42:97,43:[1,98],14:[2,32],10:[2,32],36:[2,32]},{62:[2,43],65:[2,43],67:[2,43],68:[2,43],69:[2,43],70:[2,43],71:[2,43],72:[2,43],73:[2,43],74:[2,43],75:[2,43],76:[2,43],77:[2,43],78:[2,43],23:[2,43]},{44:[2,45],48:[2,45],24:[2,45]},{62:[2,46],65:[2,46],67:[2,46],68:[2,46],69:[2,46],70:[2,46],71:[2,46],72:[2,46],73:[2,46],74:[2,46],75:[2,46],76:[2,46],77:[2,46],78:[2,46],23:[2,46]},{44:[2,48],57:[2,48],48:[2,48],24:[2,48]},{44:[2,50],60:[2,50],57:[2,50],48:[2,50],24:[2,50]},{38:99,52:[1,66],22:[1,67],53:[1,68],54:[1,69]},{24:[1,100]},{25:[2,35],26:[2,35],27:[2,35],28:[2,35],29:[2,35],30:[2,35],22:[2,35],40:[2,35],46:[2,35],50:[2,35],35:[2,35]},{25:[2,37],26:[2,37],27:[2,37],28:[2,37],29:[2,37],30:[2,37],22:[2,37],40:[2,37],46:[2,37],50:[2,37],35:[2,37]},{38:101,52:[1,66],22:[1,67],53:[1,68],54:[1,69]},{38:102,52:[1,66],22:[1,67],53:[1,68],54:[1,69]},{19:103,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27]},{22:[1,104]},{20:[2,8],16:[2,8],7:[2,8]},{22:[1,105]},{1:[2,3]},{14:[2,29],10:[2,29],36:[2,29],43:[2,29]},{19:106,25:[1,9],26:[1,10],27:[1,11],28:[1,12],29:[1,13],30:[1,14],31:15,32:16,33:17,34:18,35:[1,19],22:[1,20],39:21,47:22,49:23,40:[1,24],45:25,50:[1,26],46:[1,27]},{25:[2,31],26:[2,31],27:[2,31],28:[2,31],29:[2,31],30:[2,31],22:[2,31],40:[2,31],46:[2,31],50:[2,31],35:[2,31]},{24:[1,107]},{44:[2,55],57:[2,55],60:[2,55],48:[2,55],24:[2,55]},{24:[1,108]},{24:[1,109]},{14:[2,7]},{24:[1,110]},{24:[1,111]},{14:[2,33],10:[2,33],36:[2,33],43:[2,33]},{44:[2,53],57:[2,53],60:[2,53],48:[2,53],24:[2,53]},{51:[2,41],24:[2,41]},{51:[2,42],24:[2,42]},{18:[2,10]},{14:[2,12]}],
defaultActions: {40:[2,30],95:[2,3],103:[2,7],110:[2,10],111:[2,12]},
parseError: 
function parseError(str, hash) {
    throw new Error(str);
}
,
parse: 
function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    if (typeof this.yy.parseError === "function") {
        this.parseError = this.yy.parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null) {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            if (!recovering) {
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                }
                var errStr = "";
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ");
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : ("'" + (this.terminals_[symbol] || symbol) + "'"));
                }
                this.parseError(errStr, {text:this.lexer.match, token:this.terminals_[symbol] || symbol, line:this.lexer.yylineno, loc:yyloc, expected:expected});
            }
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || "Parsing halted.");
                }
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }
            while (1) {
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || "Parsing halted.");
                }
                popStack(1);
                state = stack[stack.length - 1];
            }
            preErrorSymbol = symbol;
            symbol = TERROR;
            state = stack[stack.length - 1];
            action = table[state] && table[state][TERROR];
            recovering = 3;
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line:lstack[lstack.length - (len || 1)].first_line, last_line:lstack[lstack.length - 1].last_line, first_column:lstack[lstack.length - (len || 1)].first_column, last_column:lstack[lstack.length - 1].last_column};
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
    }
    return true;
}
};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:
function parseError(str, hash) {
    if (this.yy.parseError) {
        this.yy.parseError(str, hash);
    } else {
        throw new Error(str);
    }
}
,
setInput:
function (input) {
    this._input = input;
    this._more = this._less = this.done = false;
    this.yylineno = this.yyleng = 0;
    this.yytext = this.matched = this.match = "";
    this.conditionStack = ["INITIAL"];
    this.yylloc = {first_line:1, first_column:0, last_line:1, last_column:0};
    return this;
}
,
input:
function () {
    var ch = this._input[0];
    this.yytext += ch;
    this.yyleng++;
    this.match += ch;
    this.matched += ch;
    var lines = ch.match(/\n/);
    if (lines) {
        this.yylineno++;
    }
    this._input = this._input.slice(1);
    return ch;
}
,
unput:
function (ch) {
    this._input = ch + this._input;
    return this;
}
,
more:
function () {
    this._more = true;
    return this;
}
,
pastInput:
function () {
    var past = this.matched.substr(0, this.matched.length - this.match.length);
    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
}
,
upcomingInput:
function () {
    var next = this.match;
    if (next.length < 20) {
        next += this._input.substr(0, 20 - next.length);
    }
    return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
}
,
showPosition:
function () {
    var pre = this.pastInput();
    var c = new Array(pre.length + 1).join("-");
    return pre + this.upcomingInput() + "\n" + c + "^";
}
,
next:
function () {
    if (this.done) {
        return this.EOF;
    }
    if (!this._input) {
        this.done = true;
    }
    var token, match, col, lines;
    if (!this._more) {
        this.yytext = "";
        this.match = "";
    }
    var rules = this._currentRules();
    for (var i = 0; i < rules.length; i++) {
        match = this._input.match(this.rules[rules[i]]);
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) {
                this.yylineno += lines.length;
            }
            this.yylloc = {first_line:this.yylloc.last_line, last_line:this.yylineno + 1, first_column:this.yylloc.last_column, last_column:lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match.length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[i], this.conditionStack[this.conditionStack.length - 1]);
            if (token) {
                return token;
            } else {
                return;
            }
        }
    }
    if (this._input === "") {
        return this.EOF;
    } else {
        this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {text:"", token:null, line:this.yylineno});
    }
}
,
lex:
function lex() {
    var r = this.next();
    if (typeof r !== "undefined") {
        return r;
    } else {
        return this.lex();
    }
}
,
begin:
function begin(condition) {
    this.conditionStack.push(condition);
}
,
popState:
function popState() {
    return this.conditionStack.pop();
}
,
_currentRules:
function _currentRules() {
    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
}
});
lexer.performAction = 
function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
    var YYSTATE = YY_START;
    switch ($avoiding_name_collisions) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        return 52;
        break;
      case 3:
        return 4;
        break;
      case 4:
        return 11;
        break;
      case 5:
        return 7;
        break;
      case 6:
        return 10;
        break;
      case 7:
        return 16;
        break;
      case 8:
        return 20;
        break;
      case 9:
        return 18;
        break;
      case 10:
        return 25;
        break;
      case 11:
        return 26;
        break;
      case 12:
        return 27;
        break;
      case 13:
        return 28;
        break;
      case 14:
        return 29;
        break;
      case 15:
        return 30;
        break;
      case 16:
        return 35;
        break;
      case 17:
        return 36;
        break;
      case 18:
        return 54;
        break;
      case 19:
        return 53;
        break;
      case 20:
        return 44;
        break;
      case 21:
        return 43;
        break;
      case 22:
        return 40;
        break;
      case 23:
        return 46;
        break;
      case 24:
        return 48;
        break;
      case 25:
        return 50;
        break;
      case 26:
        return 51;
        break;
      case 27:
        return 57;
        break;
      case 28:
        return 60;
        break;
      case 29:
        return 62;
        break;
      case 30:
        return 65;
        break;
      case 31:
        return 67;
        break;
      case 32:
        return 68;
        break;
      case 33:
        return 69;
        break;
      case 34:
        return 70;
        break;
      case 35:
        return 71;
        break;
      case 36:
        return 72;
        break;
      case 37:
        return 73;
        break;
      case 38:
        return 74;
        break;
      case 39:
        return 75;
        break;
      case 40:
        return 76;
        break;
      case 41:
        return 77;
        break;
      case 42:
        return 78;
        break;
      case 43:
        return 22;
        break;
      case 44:
        return 14;
        break;
      case 45:
        return 23;
        break;
      case 46:
        return 24;
        break;
      case 47:
        break;
      case 48:
        return 12;
        break;
      case 49:
        return "INVALID";
        break;
    }
}
;
lexer.rules = [/^\/\/.*/,/^\{(.|\n)*\}/,/^([1-9][0-9]*|0)/,/^iniciar-programa\b/,/^finalizar-programa\b/,/^inicia-ejecucion\b/,/^termina-ejecucion\b/,/^define-nueva-instruccion\b/,/^define-prototipo-instruccion\b/,/^como\b/,/^apagate\b/,/^gira-izquierda\b/,/^avanza\b/,/^coge-zumbador\b/,/^deja-zumbador\b/,/^sal-de-instruccion\b/,/^inicio\b/,/^fin\b/,/^sucede\b/,/^precede\b/,/^entonces\b/,/^sino\b/,/^si\b/,/^mientras\b/,/^hacer\b/,/^repite\b/,/^veces\b/,/^o\b/,/^y\b/,/^no\b/,/^es-cero\b/,/^frente-libre\b/,/^frente-bloqueado\b/,/^izquierda-libre\b/,/^izquierda-bloqueada\b/,/^derecha-libre\b/,/^derecha-bloqueada\b/,/^junto-a-zumbador\b/,/^zumbador-en-mochila\b/,/^orientado-al-norte\b/,/^orientado-al-sur\b/,/^orientado-al-este\b/,/^orientado-al-oeste\b/,/^[a-zA-Z][a-zA-Z0-9"\-"]*/,/^;/,/^\(/,/^\)/,/^\s+/,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = paskarel;
exports.parse = function () { return paskarel.parse.apply(paskarel, arguments); }
exports.main = 
function commonjsMain(args) {
    if (!args[1]) {
        throw new Error("Usage: " + args[0] + " FILE");
    }
    if (typeof process !== "undefined") {
        var source = require("fs").readFileSync(require("path").join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset:"utf-8"});
    }
    return exports.parser.parse(source);
}

if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}