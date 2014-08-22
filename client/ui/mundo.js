//Mundos de Karel
var mundo = (function () {
    var Utils = KAREL.utils,
        ejecucionDrawing;
    
    $(document).ready(function () {
        ejecucionDrawing = KAREL.utils.ejecucionDrawing;
    });
    
    return {
        zumbadores: {
            montones: {},
            enMochila: 0,
            poner: function (x, y, monton) {
                montonCode = (x - 1)*100 + y - 1;
                this.montones[montonCode] = monton;
                if (monton == 0) {
                    delete this.montones[montonCode];
                }
                //ejecucionDrawing.draw();
                ejecucionDrawing.dibujaCasilla(x, y);
            },
            get: function(x, y) {
                montonCode = (x - 1)*100 + y - 1;
                if (this.montones[montonCode] !== undefined) {
                    return this.montones[montonCode];
                }
                else {
                    return 0;
                }
            },
            fromCode: function(montonCode) {
                var x = Math.floor(montonCode / 100) + 1,
                    y = (montonCode + 1) % 100;
                return [x, y];
            }
        },
        paredes: {
            muros: {},
            poner: function(x, y, orientacion) {
                //flujo--> 0:a la izquierda o abajo, 1: a la derecha o arriba, 2: ambos sentidos.
                if (orientacion == 'vertical') {
                    ori = 0;
                }
                else if (orientacion == 'horizontal') {
                    ori = 1;
                }
                paredCode = y*200 + x*2 + ori;
                //console.log(paredCode);
                if (paredCode > 0) {
                    if ($("#valvula").attr("checked")) {
                        if (this.muros[paredCode] === 0) {
                            this.muros[paredCode] = 1;
                            return true;
                        }
                        else if (this.muros[paredCode] === 1) {
                            delete this.muros[paredCode];
                            return false;
                        }
                        else {
                            this.muros[paredCode] = 0;
                            return true;
                        }
                    }
                    else {
                        if (this.muros[paredCode] !== undefined) {
                            delete this.muros[paredCode];
                            return false;
                        }
                        else {
                            this.muros[paredCode] = 2;
                            return true;
                        }
                    }
                }
            },
            get: function(x, y, orientacion, flujo) {
                var ori = (orientacion === 'vertical') ? 0 : 1,
                    paredCode = y*200 + x*2 + ori,
                    pared = this.muros[paredCode];
                //flujo--> 0:a la izquierda o abajo, 1: a la derecha o arriba, 2: cualquiera
                if (flujo === undefined) {
                    flujo = 2;
                }
                //checar las paredes límite del mundo
                if ((x == 0 && orientacion == 'vertical') || (x == mundo.tamaño && orientacion == 'vertical') ||
                    (y == 0 && orientacion == 'horizontal') || (y == mundo.tamaño && orientacion == 'horizontal')) {
                    return true;
                }
                //checar las paredes internas del mundo
                if (pared === undefined) {
                    return false;
                }
                else {
                    return ((pared == 0 && flujo == 1) || (pared == 1 && flujo == 0) || (pared == 2));
                }
            },
            fromCode: function(paredCode) {
                tipo = paredCode % 2;
                columna = ((paredCode - tipo) / 2) % 100;
                renglon = Math.floor((paredCode - columna*2 - tipo) / 200);
                if (tipo == 0) {
                    tipo = 'vertical';
                }
                else {
                    tipo = 'horizontal';
                }
                return [renglon, columna, tipo];
            }
        },
        karelX: 1,
        karelY: 1,
        orientacion: 'norte',
        tamaño: 100,
        //guardan la posicion (relativo a casillas) del click de raton
        clickX: 1,
        clickY: 1,
        //guardan el tamaño del mundo en pixeles
        width: 100,
        height: 100,
        //guarda el panneo del mundo
        pan: [-40, -40],
        
        //==funciones de la API moveKarel==
        avanza: function() {
            var coorAnterior = [this.karelX, this.karelY];
            switch (orientacion) {
            case 'norte':
                this.karelY++;
                break;
            case 'este':
                this.karelX++;
                break;
            case 'sur':
                this.karelY--;
                break;
            case 'oeste':
                this.karelX--;
                break;
            }
            ejecucionDrawing.dibujaCasilla(coorAnterior[0], coorAnterior[1]);
            ejecucionDrawing.dibujaCasilla(this.karelX, this.karelY);
            //ejecucionDrawing.draw();
        },
        setPosicion: function(x, y, pan) {
            var coorAnterior = [this.karelX, this.karelY],
                panAnterior = [this.pan[0], this.pan[1]],
                altura = ejecucionDrawing.mundo.height,
                ancho = ejecucionDrawing.mundo.width;
            this.karelX = x;
            this.karelY = y;
            if (pan === undefined) {
                pan = true;
            }
            //ajustar el panning de ser necesario
            if (pan) {
                if (this.karelY*32 < this.pan[1] + 32) {
                    this.pan[1] -= Math.round(altura / 2);
                }
                else if (this.karelY*32 > this.pan[1] + altura) {
                    this.pan[1] += Math.round(altura / 2);
                }
                if (this.pan[1]<-40) {
                    this.pan[1] = -40;
                }
                if (this.pan[1] > 3240 - altura) {
                    this.pan[1] = 3240 - altura;
                }
                if (this.karelX*32 < this.pan[0] + 32) {
                    this.pan[0] -= Math.round(ancho / 2);
                }
                else if (this.karelX*32 > this.pan[0] + ancho) {
                    this.pan[0] += Math.round(ancho / 2);
                }
                if (this.pan[0] < -40) {
                    this.pan[0] = -40;
                }
                if (this.pan[0] > 3240 - ancho) {
                    this.pan[0] = 3240 - ancho;
                }
                //repintar todo si el pan cambio
                if ((this.pan[0] != panAnterior[0]) || (this.pan[1] != panAnterior[1])) {
                    ejecucionDrawing.draw();
                }
            }
            ejecucionDrawing.dibujaCasilla(coorAnterior[0], coorAnterior[1]);
            ejecucionDrawing.dibujaCasilla(this.karelX, this.karelY);
            //ejecucionDrawing.draw();
        },
        setOrientacion: function(orientacion) {
            this.orientacion = orientacion;
            ejecucionDrawing.dibujaCasilla(this.karelX, this.karelY);
            //ejecucionDrawing.draw();
        },
        setMochila: function(monton) {
            this.zumbadores.enMochila = monton;
            $("#zumbadores-ejecucion").text(monton);
        }
    };
}());