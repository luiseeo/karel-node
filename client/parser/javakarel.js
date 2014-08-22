/* Jison generated parser */
var javakarel = (function(){
var parser = {trace: 
function trace() {
}
,
yy: {},
symbols_: {"error":2,"primera":3,"CLASS":4,"PROGRAM":5,"{":6,"segunda":7,"metodos":8,"(":9,")":10,"programa":11,"bloque":12,"}":13,"EOF":14,"metodo":15,"tipo":16,"firma":17,"VOID":18,"DEFINE":19,"ID":20,"parametro":21,"estatuto":22,"TURNOFF":23,"PUNTOCOMA":24,"TURNLEFT":25,"MOVE":26,"PICKBEEPER":27,"PUTBEEPER":28,"RETURN":29,"llamada":30,"ifestatuto":31,"whileloop":32,"iterate":33,"estatutos":34,"argumento":35,"expresion":36,"ifthen":37,"IF":38,"termino":39,"elset":40,"ELSE":41,"whilet":42,"WHILE":43,"whiletermino":44,"iterateexpr":45,"ITERATE":46,"DECIMAL":47,"PRED":48,"SUCC":49,"clausulayaux":50,"clausulay":51,"OR":52,"clausulanoaux":53,"clausulano":54,"AND":55,"not":56,"!":57,"clausulaAtomica":58,"parentesis":59,"ISZERO":60,"funcionbooleana":61,"FRONTISCLEAR":62,"FRONTISBLOCKED":63,"LEFTISCLEAR":64,"LEFTISBLOCKED":65,"RIGHTISCLEAR":66,"RIGHTISBLOCKED":67,"NEXTOABEEPER":68,"BEEPERSINBAG":69,"FACINGNORTH":70,"FACINGSOUTH":71,"FACINGEAST":72,"FACINGWEST":73,"$accept":0,"$end":1},
terminals_: {2:"error",4:"CLASS",5:"PROGRAM",6:"{",9:"(",10:")",13:"}",14:"EOF",18:"VOID",19:"DEFINE",20:"ID",23:"TURNOFF",24:"PUNTOCOMA",25:"TURNLEFT",26:"MOVE",27:"PICKBEEPER",28:"PUTBEEPER",29:"RETURN",38:"IF",41:"ELSE",43:"WHILE",46:"ITERATE",47:"DECIMAL",48:"PRED",49:"SUCC",52:"OR",55:"AND",57:"!",60:"ISZERO",62:"FRONTISCLEAR",63:"FRONTISBLOCKED",64:"LEFTISCLEAR",65:"LEFTISBLOCKED",66:"RIGHTISCLEAR",67:"RIGHTISBLOCKED",68:"NEXTOABEEPER",69:"BEEPERSINBAG",70:"FACINGNORTH",71:"FACINGSOUTH",72:"FACINGEAST",73:"FACINGWEST"},
productions_: [0,[3,3],[7,4],[11,5],[8,2],[8,0],[15,3],[16,1],[16,1],[17,4],[21,1],[21,0],[22,4],[22,4],[22,4],[22,4],[22,4],[22,4],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1],[34,2],[34,1],[12,3],[12,2],[30,5],[35,1],[35,0],[37,4],[40,1],[31,2],[31,4],[42,1],[44,4],[32,2],[45,4],[33,2],[36,1],[36,1],[36,4],[36,4],[50,2],[39,1],[39,2],[53,2],[51,1],[51,2],[56,1],[54,1],[54,2],[59,1],[58,4],[58,1],[58,3],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1]],
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
        procActual = $$[$0 - 2];
        dirproc[procActual] = {parametro:undefined, cuadruplo:cuadruplos.length, memoria:{enteros:100000, booleanos:3000000}};
        break;
      case 3:
        cuadruplos[0][1] = dirproc["program"].memoria.enteros;
        cuadruplos[0][2] = dirproc["program"].memoria.booleanos;
        cuadruplos[1][3] = dirproc["program"].cuadruplo;
        for (i = 0; i < llamadas.length; i++) {
            llamada = llamadas[i];
            if (dirproc[llamada.id] === undefined) {
                errores.push({message:"error, el procedimiento '" + llamada.id + "' no existe", lineNo:llamada.linea});
                break;
            }
            if (dirproc[llamada.id].parametro !== undefined && llamada.idvar === undefined) {
                errores.push({message:"El procedimiento '" + llamada.id + "' lleva parametro", lineNo:llamada.linea});
                break;
            } else {
                if (dirproc[llamada.id].parametro === undefined && llamada.idvar !== undefined) {
                    errores.push({message:"El procedimiento '" + llamada.id + "' no lleva parametro", lineNo:llamada.linea});
                    break;
                } else {
                    cuadruplos[llamada.cuadruplo][1] = dirproc[llamada.id].cuadruplo;
                    if (llamada.idvar !== undefined) {
                        cuadruplos[llamada.cuadruplo][2] = dirproc[llamada.id].parametro.dir;
                    }
                    cuadruplos[llamada.cuadruplo - 1][1] = dirproc[llamada.id].memoria.enteros;
                    cuadruplos[llamada.cuadruplo - 1][2] = dirproc[llamada.id].memoria.booleanos;
                }
            }
        }
        break;
      case 6:
        cuadruplos.push([commands["RETURN"], "", "", ""]);
        break;
      case 9:
        procActual = $$[$0 - 3];
        if (dirproc[procActual] !== undefined) {
            errores.push({message:"El procedimiento '" + procActual + "' ya fue definido.", lineNo:llamada.linea});
        }
        if ($$[$0 - 1] === undefined) {
            dirproc[procActual] = {parametro:undefined, cuadruplo:programaCompilado.cuadruplos.length, memoria:{enteros:100000, booleanos:3000000}};
        } else {
            dirproc[procActual] = {parametro:{id:$$[$0 - 1], dir:100000}, cuadruplo:programaCompilado.cuadruplos.length, memoria:{enteros:100001, booleanos:3000000}};
        }
        break;
      case 10:
        this.$ = $$[$0];
        break;
      case 11:
        this.$ = undefined;
        break;
      case 12:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["END"], "", "", ""]);
        break;
      case 13:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["GIRA_IZQ"], "", "", ""]);
        break;
      case 14:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["AVANZA"], "", "", ""]);
        break;
      case 15:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["COGE_ZUM"], "", "", ""]);
        break;
      case 16:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["DEJA_ZUM"], "", "", ""]);
        break;
      case 17:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["RETURN"], "", "", ""]);
        break;
      case 28:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["ERA"], $$[$0 - 4], "", ""]);
        llamadas.push({id:$$[$0 - 4], idvar:$$[$0 - 2], linea:yylineno + 1, cuadruplo:cuadruplos.length});
        cuadruplos.push([commands["GOSUB"], "", "", ""]);
        break;
      case 29:
        cuadruplos.push([commands["PARAM"], POperandos.pop(), "", ""]);
        break;
      case 31:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["GOTOF"], POperandos.pop(), "", ""]);
        break;
      case 32:
        cuadruplos.push([commands["GOTO"], "", "", ""]);
        gotof = PSaltos.pop();
        cuadruplos[gotof][3] = cuadruplos.length;
        PSaltos.push(cuadruplos.length - 1);
        break;
      case 33:
        gotof = PSaltos.pop();
        cuadruplos[gotof][3] = cuadruplos.length;
        break;
      case 34:
        salto = PSaltos.pop();
        cuadruplos[salto][3] = cuadruplos.length;
        break;
      case 35:
        PSaltos.push(cuadruplos.length);
        break;
      case 36:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["GOTOF"], POperandos.pop(), "", ""]);
        break;
      case 37:
        gotof = PSaltos.pop();
        loop = PSaltos.pop();
        cuadruplos.push([commands["GOTO"], "", "", loop]);
        cuadruplos[gotof][3] = cuadruplos.length;
        break;
      case 38:
        cuadruplos.push([commands["SUCC"], POperandos.pop(), "", dirproc[procActual].memoria.enteros++]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["PRED"], dirproc[procActual].memoria.enteros - 1, "", dirproc[procActual].memoria.enteros - 1]);
        cuadruplos.push([commands["ES_CERO"], dirproc[procActual].memoria.enteros - 1, "", dirproc[procActual].memoria.booleanos++]);
        cuadruplos.push([commands["NOT"], dirproc[procActual].memoria.booleanos - 1, "", dirproc[procActual].memoria.booleanos++]);
        PSaltos.push(cuadruplos.length);
        cuadruplos.push([commands["GOTOF"], dirproc[procActual].memoria.booleanos - 1, "", ""]);
        break;
      case 39:
        gotof = PSaltos.pop();
        loop = PSaltos.pop();
        cuadruplos.push([commands["GOTO"], "", "", loop]);
        cuadruplos[gotof][3] = cuadruplos.length;
        break;
      case 40:
        POperandos.push("#" + $$[$0]);
        break;
      case 41:
        if (dirproc[procActual].parametro.id !== $$[$0]) {
            errores.push({message:"error, la variable '" + $$[$0] + "' no existe en ese contexto", lineNo:yylineno + 1});
        } else {
            POperandos.push(dirproc[procActual].parametro.dir);
        }
        break;
      case 42:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["PRED"], POperandos.pop(), "", dirproc[procActual].memoria.enteros++]);
        POperandos.push(dirproc[procActual].memoria.enteros - 1);
        break;
      case 43:
        cuadruplos.push([commands["STEP"], "", "", yylineno + 1]);
        cuadruplos.push([commands["SUCC"], POperandos.pop(), "", dirproc[procActual].memoria.enteros++]);
        POperandos.push(dirproc[procActual].memoria.enteros - 1);
        break;
      case 44:
        POperadores.push(commands["OR"]);
        break;
      case 46:
        operador = POperadores.pop();
        if (operador === commands["OR"]) {
            cuadruplos.push([operador, POperandos.pop(), POperandos.pop(), dirproc[procActual].memoria.booleanos++]);
            POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        } else {
            POperadores.push(operador);
        }
        break;
      case 47:
        POperadores.push(commands["AND"]);
        break;
      case 49:
        operador = POperadores.pop();
        if (operador === commands["AND"]) {
            cuadruplos.push([operador, POperandos.pop(), POperandos.pop(), dirproc[procActual].memoria.booleanos++]);
            POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        } else {
            POperadores.push(operador);
        }
        break;
      case 50:
        POperadores.push(commands["NOT"]);
        break;
      case 52:
        operador = POperadores.pop();
        if (operador === commands["NOT"]) {
            cuadruplos.push([operador, POperandos.pop(), "", dirproc[procActual].memoria.booleanos++]);
            POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        } else {
            POperadores.push(operador);
        }
        break;
      case 53:
        POperadores.push("(");
        break;
      case 54:
        cuadruplos.push([commands["ES_CERO"], POperandos.pop(), "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 56:
        POperadores.pop();
        break;
      case 57:
        cuadruplos.push([commands["FRENTE_LIB"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 58:
        cuadruplos.push([commands["FRENTE_BLO"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 59:
        cuadruplos.push([commands["IZQ_LIB"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 60:
        cuadruplos.push([commands["IZQ_BLO"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 61:
        cuadruplos.push([commands["DER_LIB"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 62:
        cuadruplos.push([commands["DER_BLO"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 63:
        cuadruplos.push([commands["JUNTO_ZUM"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 64:
        cuadruplos.push([commands["ZUM_MOCHILA"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 65:
        cuadruplos.push([commands["NORTE"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 66:
        cuadruplos.push([commands["SUR"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 67:
        cuadruplos.push([commands["ESTE"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
      case 68:
        cuadruplos.push([commands["OESTE"], "", "", dirproc[procActual].memoria.booleanos++]);
        POperandos.push(dirproc[procActual].memoria.booleanos - 1);
        break;
    }
}
,
table: [{11:1,3:2,4:[1,3]},{1:[3]},{7:4,8:5,15:6,16:7,18:[1,8],19:[1,9],5:[2,5]},{5:[1,10]},{12:11,6:[1,12]},{5:[1,13]},{8:14,15:6,16:7,18:[1,8],19:[1,9],5:[2,5]},{17:15,20:[1,16]},{20:[2,7]},{20:[2,8]},{6:[1,17]},{13:[1,18]},{34:19,13:[1,20],22:21,23:[1,22],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:[1,27],30:28,31:29,32:30,33:31,24:[1,32],12:33,20:[1,34],37:35,44:36,45:37,6:[1,12],38:[1,38],42:39,46:[1,40],43:[1,41]},{9:[1,42]},{5:[2,4]},{12:43,6:[1,12]},{9:[1,44]},{5:[2,1],18:[2,1],19:[2,1]},{14:[1,45]},{13:[1,46]},{13:[2,27],6:[2,27],24:[2,27],46:[2,27],43:[2,27],38:[2,27],20:[2,27],29:[2,27],28:[2,27],27:[2,27],26:[2,27],25:[2,27],23:[2,27],19:[2,27],18:[2,27],5:[2,27],41:[2,27]},{34:47,22:21,23:[1,22],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:[1,27],30:28,31:29,32:30,33:31,24:[1,32],12:33,20:[1,34],37:35,44:36,45:37,6:[1,12],38:[1,38],42:39,46:[1,40],43:[1,41],13:[2,25]},{9:[1,48]},{9:[1,49]},{9:[1,50]},{9:[1,51]},{9:[1,52]},{9:[1,53]},{23:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],29:[2,18],20:[2,18],38:[2,18],43:[2,18],46:[2,18],24:[2,18],6:[2,18],13:[2,18],41:[2,18]},{23:[2,19],25:[2,19],26:[2,19],27:[2,19],28:[2,19],29:[2,19],20:[2,19],38:[2,19],43:[2,19],46:[2,19],24:[2,19],6:[2,19],13:[2,19],41:[2,19]},{23:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],29:[2,20],20:[2,20],38:[2,20],43:[2,20],46:[2,20],24:[2,20],6:[2,20],13:[2,20],41:[2,20]},{23:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],29:[2,21],20:[2,21],38:[2,21],43:[2,21],46:[2,21],24:[2,21],6:[2,21],13:[2,21],41:[2,21]},{23:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],29:[2,22],20:[2,22],38:[2,22],43:[2,22],46:[2,22],24:[2,22],6:[2,22],13:[2,22],41:[2,22]},{23:[2,23],25:[2,23],26:[2,23],27:[2,23],28:[2,23],29:[2,23],20:[2,23],38:[2,23],43:[2,23],46:[2,23],24:[2,23],6:[2,23],13:[2,23],41:[2,23]},{9:[1,54]},{22:55,23:[1,22],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:[1,27],30:28,31:29,32:30,33:31,24:[1,32],12:33,20:[1,34],37:35,44:36,45:37,6:[1,12],38:[1,38],42:39,46:[1,40],43:[1,41]},{22:56,23:[1,22],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:[1,27],30:28,31:29,32:30,33:31,24:[1,32],12:33,20:[1,34],37:35,44:36,45:37,6:[1,12],38:[1,38],42:39,46:[1,40],43:[1,41]},{22:57,23:[1,22],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:[1,27],30:28,31:29,32:30,33:31,24:[1,32],12:33,20:[1,34],37:35,44:36,45:37,6:[1,12],38:[1,38],42:39,46:[1,40],43:[1,41]},{9:[1,58]},{9:[1,59]},{9:[1,60]},{9:[2,35]},{10:[1,61]},{5:[2,6],18:[2,6],19:[2,6]},{21:62,20:[1,63],10:[2,11]},{1:[2,3]},{13:[2,26],6:[2,26],24:[2,26],46:[2,26],43:[2,26],38:[2,26],20:[2,26],29:[2,26],28:[2,26],27:[2,26],26:[2,26],25:[2,26],23:[2,26],19:[2,26],18:[2,26],5:[2,26],41:[2,26]},{13:[2,24]},{10:[1,64]},{10:[1,65]},{10:[1,66]},{10:[1,67]},{10:[1,68]},{10:[1,69]},{35:70,36:71,47:[1,72],20:[1,73],48:[1,74],49:[1,75],10:[2,30]},{40:76,41:[1,77],13:[2,33],6:[2,33],24:[2,33],46:[2,33],43:[2,33],38:[2,33],20:[2,33],29:[2,33],28:[2,33],27:[2,33],26:[2,33],25:[2,33],23:[2,33]},{13:[2,37],6:[2,37],24:[2,37],46:[2,37],43:[2,37],38:[2,37],20:[2,37],29:[2,37],28:[2,37],27:[2,37],26:[2,37],25:[2,37],23:[2,37],41:[2,37]},{13:[2,39],6:[2,39],24:[2,39],46:[2,39],43:[2,39],38:[2,39],20:[2,39],29:[2,39],28:[2,39],27:[2,39],26:[2,39],25:[2,39],23:[2,39],41:[2,39]},{39:78,51:79,50:80,54:81,53:82,58:83,56:84,60:[1,85],61:86,59:87,57:[1,88],62:[1,89],63:[1,90],64:[1,91],65:[1,92],66:[1,93],67:[1,94],68:[1,95],69:[1,96],70:[1,97],71:[1,98],72:[1,99],73:[1,100],9:[1,101]},{39:102,51:79,50:80,54:81,53:82,58:83,56:84,60:[1,85],61:86,59:87,57:[1,88],62:[1,89],63:[1,90],64:[1,91],65:[1,92],66:[1,93],67:[1,94],68:[1,95],69:[1,96],70:[1,97],71:[1,98],72:[1,99],73:[1,100],9:[1,101]},{36:103,47:[1,72],20:[1,73],48:[1,74],49:[1,75]},{6:[2,2]},{10:[1,104]},{10:[2,10]},{24:[1,105]},{24:[1,106]},{24:[1,107]},{24:[1,108]},{24:[1,109]},{24:[1,110]},{10:[1,111]},{10:[2,29]},{10:[2,40]},{10:[2,41]},{9:[1,112]},{9:[1,113]},{22:114,23:[1,22],25:[1,23],26:[1,24],27:[1,25],28:[1,26],29:[1,27],30:28,31:29,32:30,33:31,24:[1,32],12:33,20:[1,34],37:35,44:36,45:37,6:[1,12],38:[1,38],42:39,46:[1,40],43:[1,41]},{23:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],29:[2,32],20:[2,32],38:[2,32],43:[2,32],46:[2,32],24:[2,32],6:[2,32]},{10:[1,115]},{52:[1,116],10:[2,45]},{39:117,51:79,50:80,54:81,53:82,58:83,56:84,60:[1,85],61:86,59:87,57:[1,88],62:[1,89],63:[1,90],64:[1,91],65:[1,92],66:[1,93],67:[1,94],68:[1,95],69:[1,96],70:[1,97],71:[1,98],72:[1,99],73:[1,100],9:[1,101]},{55:[1,118],10:[2,48],52:[2,48]},{51:119,54:81,53:82,58:83,56:84,60:[1,85],61:86,59:87,57:[1,88],62:[1,89],63:[1,90],64:[1,91],65:[1,92],66:[1,93],67:[1,94],68:[1,95],69:[1,96],70:[1,97],71:[1,98],72:[1,99],73:[1,100],9:[1,101]},{10:[2,51],55:[2,51],52:[2,51]},{58:120,60:[1,85],61:86,59:87,62:[1,89],63:[1,90],64:[1,91],65:[1,92],66:[1,93],67:[1,94],68:[1,95],69:[1,96],70:[1,97],71:[1,98],72:[1,99],73:[1,100],9:[1,101]},{9:[1,121]},{10:[2,55],52:[2,55],55:[2,55]},{39:122,51:79,50:80,54:81,53:82,58:83,56:84,60:[1,85],61:86,59:87,57:[1,88],62:[1,89],63:[1,90],64:[1,91],65:[1,92],66:[1,93],67:[1,94],68:[1,95],69:[1,96],70:[1,97],71:[1,98],72:[1,99],73:[1,100],9:[1,101]},{60:[2,50],62:[2,50],63:[2,50],64:[2,50],65:[2,50],66:[2,50],67:[2,50],68:[2,50],69:[2,50],70:[2,50],71:[2,50],72:[2,50],73:[2,50],9:[2,50]},{10:[2,57],55:[2,57],52:[2,57]},{10:[2,58],55:[2,58],52:[2,58]},{10:[2,59],55:[2,59],52:[2,59]},{10:[2,60],55:[2,60],52:[2,60]},{10:[2,61],55:[2,61],52:[2,61]},{10:[2,62],55:[2,62],52:[2,62]},{10:[2,63],55:[2,63],52:[2,63]},{10:[2,64],55:[2,64],52:[2,64]},{10:[2,65],55:[2,65],52:[2,65]},{10:[2,66],55:[2,66],52:[2,66]},{10:[2,67],55:[2,67],52:[2,67]},{10:[2,68],55:[2,68],52:[2,68]},{60:[2,53],62:[2,53],63:[2,53],64:[2,53],65:[2,53],66:[2,53],67:[2,53],68:[2,53],69:[2,53],70:[2,53],71:[2,53],72:[2,53],73:[2,53],9:[2,53],57:[2,53]},{10:[1,123]},{10:[1,124]},{6:[2,9]},{23:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],29:[2,12],20:[2,12],38:[2,12],43:[2,12],46:[2,12],24:[2,12],6:[2,12],13:[2,12],41:[2,12]},{23:[2,13],25:[2,13],26:[2,13],27:[2,13],28:[2,13],29:[2,13],20:[2,13],38:[2,13],43:[2,13],46:[2,13],24:[2,13],6:[2,13],13:[2,13],41:[2,13]},{23:[2,14],25:[2,14],26:[2,14],27:[2,14],28:[2,14],29:[2,14],20:[2,14],38:[2,14],43:[2,14],46:[2,14],24:[2,14],6:[2,14],13:[2,14],41:[2,14]},{23:[2,15],25:[2,15],26:[2,15],27:[2,15],28:[2,15],29:[2,15],20:[2,15],38:[2,15],43:[2,15],46:[2,15],24:[2,15],6:[2,15],13:[2,15],41:[2,15]},{23:[2,16],25:[2,16],26:[2,16],27:[2,16],28:[2,16],29:[2,16],20:[2,16],38:[2,16],43:[2,16],46:[2,16],24:[2,16],6:[2,16],13:[2,16],41:[2,16]},{23:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],29:[2,17],20:[2,17],38:[2,17],43:[2,17],46:[2,17],24:[2,17],6:[2,17],13:[2,17],41:[2,17]},{24:[1,125]},{36:126,47:[1,72],20:[1,73],48:[1,74],49:[1,75]},{36:127,47:[1,72],20:[1,73],48:[1,74],49:[1,75]},{13:[2,34],6:[2,34],24:[2,34],46:[2,34],43:[2,34],38:[2,34],20:[2,34],29:[2,34],28:[2,34],27:[2,34],26:[2,34],25:[2,34],23:[2,34],41:[2,34]},{23:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],29:[2,31],20:[2,31],38:[2,31],43:[2,31],46:[2,31],24:[2,31],6:[2,31]},{60:[2,44],62:[2,44],63:[2,44],64:[2,44],65:[2,44],66:[2,44],67:[2,44],68:[2,44],69:[2,44],70:[2,44],71:[2,44],72:[2,44],73:[2,44],9:[2,44],57:[2,44]},{10:[2,46]},{60:[2,47],62:[2,47],63:[2,47],64:[2,47],65:[2,47],66:[2,47],67:[2,47],68:[2,47],69:[2,47],70:[2,47],71:[2,47],72:[2,47],73:[2,47],9:[2,47],57:[2,47]},{10:[2,49],52:[2,49]},{10:[2,52],55:[2,52],52:[2,52]},{36:128,47:[1,72],20:[1,73],48:[1,74],49:[1,75]},{10:[1,129]},{23:[2,36],25:[2,36],26:[2,36],27:[2,36],28:[2,36],29:[2,36],20:[2,36],38:[2,36],43:[2,36],46:[2,36],24:[2,36],6:[2,36]},{23:[2,38],25:[2,38],26:[2,38],27:[2,38],28:[2,38],29:[2,38],20:[2,38],38:[2,38],43:[2,38],46:[2,38],24:[2,38],6:[2,38]},{13:[2,28],6:[2,28],24:[2,28],46:[2,28],43:[2,28],38:[2,28],20:[2,28],29:[2,28],28:[2,28],27:[2,28],26:[2,28],25:[2,28],23:[2,28],41:[2,28]},{10:[1,130]},{10:[1,131]},{10:[1,132]},{10:[2,56],52:[2,56],55:[2,56]},{10:[2,42]},{10:[2,43]},{10:[2,54],52:[2,54],55:[2,54]}],
defaultActions: {8:[2,7],9:[2,8],14:[2,4],41:[2,35],45:[2,3],47:[2,24],61:[2,2],63:[2,10],71:[2,29],72:[2,40],73:[2,41],104:[2,9],117:[2,46],130:[2,42],131:[2,43]},
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
        return 4;
        break;
      case 3:
        return 5;
        break;
      case 4:
        return 18;
        break;
      case 5:
        return 19;
        break;
      case 6:
        return 23;
        break;
      case 7:
        return 25;
        break;
      case 8:
        return 26;
        break;
      case 9:
        return 27;
        break;
      case 10:
        return 28;
        break;
      case 11:
        return 29;
        break;
      case 12:
        return 48;
        break;
      case 13:
        return 49;
        break;
      case 14:
        return 60;
        break;
      case 15:
        return 38;
        break;
      case 16:
        return 41;
        break;
      case 17:
        return 43;
        break;
      case 18:
        return 46;
        break;
      case 19:
        return 62;
        break;
      case 20:
        return 63;
        break;
      case 21:
        return 64;
        break;
      case 22:
        return 65;
        break;
      case 23:
        return 66;
        break;
      case 24:
        return 67;
        break;
      case 25:
        return 68;
        break;
      case 26:
        return 69;
        break;
      case 27:
        return 70;
        break;
      case 28:
        return 71;
        break;
      case 29:
        return 72;
        break;
      case 30:
        return 73;
        break;
      case 31:
        return 47;
        break;
      case 32:
        return 20;
        break;
      case 33:
        return 52;
        break;
      case 34:
        return 55;
        break;
      case 35:
        return 57;
        break;
      case 36:
        return 24;
        break;
      case 37:
        return 6;
        break;
      case 38:
        return 13;
        break;
      case 39:
        return 9;
        break;
      case 40:
        return 10;
        break;
      case 41:
        break;
      case 42:
        return 14;
        break;
      case 43:
        return "INVALID";
        break;
    }
}
;
lexer.rules = [/^\/\/.*/,/^\/\*(.|\n)*\*\//,/^class\b/,/^program\b/,/^void\b/,/^define\b/,/^turnoff\b/,/^turnleft\b/,/^move\b/,/^pickbeeper\b/,/^putbeeper\b/,/^return\b/,/^pred\b/,/^succ\b/,/^iszero\b/,/^if\b/,/^else\b/,/^while\b/,/^iterate\b/,/^frontIsClear\b/,/^frontIsBlocked\b/,/^leftIsClear\b/,/^leftIsBlocked\b/,/^rightIsClear\b/,/^rightIsBlocked\b/,/^nextToABeeper\b/,/^beepersInBag\b/,/^facingNorth\b/,/^facingSouth\b/,/^facingEast\b/,/^facingWest\b/,/^([1-9][0-9]*|0)/,/^[a-zA-Z][a-zA-Z0-9'-']*/,/^\|\|/,/^&&/,/^!/,/^;/,/^\{/,/^\}/,/^\(/,/^\)/,/^\s+/,/^$/,/^./];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = javakarel;
exports.parse = function () { return javakarel.parse.apply(javakarel, arguments); }
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