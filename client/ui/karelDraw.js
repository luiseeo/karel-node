/**
 * ============
 * Karel online
 * ============
 * Rutinas de pintado para el canvas de los mundos de Karel.
 * 
 * Autor: Luis Eduardo Enciso Osuna
 */

"use strict";
KAREL.drawing = (function () {
    var fondo = new Image(),
        KNorte = new Image(),
        KEste = new Image(),
        KSur = new Image(),
        KOeste = new Image(),
        temas = {
            Clasico: {
                folder: "clasico",
                wallColor: "black",
                backgroundColor: "#d0d0d0",
                font: "bold 12px sans-serif",
                fontColor: "black",
                fillZumbador: "orange",
                side: 32
            },
            Grid: {
                folder: "grid",
                wallColor: "black",
                backgroundColor: "#C2D1DC",
                font: "bold 12px sans-serif",
                fontColor: "black",
                fillZumbador: "#E9921B",
                side: 32
            },
            Hax: {
                folder: "hax",
                wallColor: "#00ff00",
                backgroundColor: "black",
                font: "Monospace 12px",
                fontColor: "#00ff00",
                fillZumbador: "#004000",
                side: 32
            },
            Zelda: {
                folder: "zelda",
                wallColor: "#000000",
                backgroundColor: "white",
                font: "bold 12px sans-serif",
                fontColor: "#000000",
                fillZumbador: "#ffff00",
                side: 32
            },
            Frogger: {
                folder: "frogger",
                wallColor: "#de6b4a",
                backgroundColor: "#000042",
                font: "9px PressStartKRegular",
                fontColor: "white",
                fillZumbador: "#ff0000",
                side: 32
            }
        };
    
    $(document).ready(function () {
        KAREL.drawing.changeTheme();
    });
    
    function changeTheme(themeName) {
        var tema = this.tema = temas[themeName] || this.tema,
            dir = "img/tema_" + tema.folder + "/",
            listos = 0,
            Drawing = KAREL.drawing;
        fondo.src = dir + "Bg.png";
        KNorte.src = dir + "KNorte.png";
        KEste.src = dir + "KEste.png";
        KSur.src = dir + "KSur.png";
        KOeste.src = dir + "KOeste.png";
        this.recursosListos = false;
        //permitir dibujar hasta que se hayan cargado los recursos
        fondo.onload = KNorte.onload = KEste.onload = KSur.onload = KOeste.onload = function () {
            listos++;
            if (listos == 5) {
                Drawing.recursosListos = true;
                KAREL.utils.edicionDrawing.draw();
            }
        };
    }
    
    var _tabsNav = null;
    function tabNavSingleton() {
        if (_tabsNav === null) {
            _tabsNav = $("ul.ui-tabs-nav")
        }
        return _tabsNav;
    }
    
    function Drawer (canvasFondo, canvasParedes, readonly) {
        var Drawing = KAREL.drawing,
            Localization = KAREL.localization,
            $toolbarMundo = $("#toolbar-mundo").parent();
        this.mundo = mundo;
        this.canvas = document.getElementById(canvasFondo);
        this.paredesLayer = document.getElementById(canvasParedes);
        this.readonly = readonly || false;
        this.paredesLayer.drawer = this;
        this.ctx = this.canvas.getContext("2d");
        //this.ctx.mozImageSmoothingEnabled=false;
        this.paredesCtx = this.paredesLayer.getContext("2d");
        
        this.hover = "";
        
        //Los mundos editables tienen event listeners par mousedown y mouseover
        if (!this.readonly) {
            this.paredesLayer.addEventListener("mousedown", function (e) {
                var offsetTop = $toolbarMundo.outerHeight(true) + tabNavSingleton().outerHeight(true),
                    coorX = e.pageX - this.offsetLeft + mundo.pan[0],
                    coorY = this.height - (e.pageY - offsetTop) + mundo.pan[1],
                    franjaX = 0,
                    franjaY = 0,
                    side = KAREL.drawing.tema.side;
                if (coorX < 6 || coorY < 6 || coorX > 100*side-6 || coorY > 100*side-6) {
                    return;
                }
                //console.log('pageX:'+e.pageX+' pageY:'+e.pageY);
                //console.log(coorX+' '+coorY);
                if (e.button == 2) {
                    //evento para situar a karel o poner zumbadores
                    if ((coorX-5)%side <= 20 && (coorY-5)%side <= 20) {
                        //guardar la casilla del monton que se esta editando
                        mundo.clickX = Math.floor(coorX / side) + 1;
                        mundo.clickY = Math.floor(coorY / side) + 1;
                        //mostrar el menú
                        $('#menu').dialog({
                            title: Localization.$editCellTitle,
                            draggable: false,
                            resizable: false,
                            dialogClass: 'menu',
                            width: '200px',
                            position: { my: "left-6 top-32", of: e, collision: "fit"}//[e.pageX+1, e.pageY+1]
                        });
                    }
                    else{
                        //TODO $('#menu').dialog('close');
                    }
                }
                else{
                    //TODO $('#menu').dialog('close');
                    // evento para poner y quitar paredes
                    if ((coorX+5)%side <= 10){
                        franjaX = Math.floor((coorX+5)/side);
                        franjaY = Math.floor(coorY/side);
                        mundo.paredes.poner(franjaX, franjaY, 'vertical');
                        this.drawer.draw(true);
                        return;
                    }
                    if ((coorY+5)%side <= 10){
                        franjaX = Math.floor(coorX/side);
                        franjaY = Math.floor((coorY+5)/side);
                        mundo.paredes.poner(franjaX,franjaY,'horizontal');
                        this.drawer.draw(true);
                        return;
                    }
                }
            }, false);
            
            this.paredesLayer.addEventListener("mousemove", function(e) {
                var offsetTop = $toolbarMundo.outerHeight(true) + tabNavSingleton().outerHeight(true),
                    coorX = e.pageX-this.offsetLeft + mundo.pan[0],
                    coorY = this.height - (e.pageY - offsetTop) + mundo.pan[1],
                    franjaX = 0,
                    franjaY = 0,
                    side = KAREL.drawing.tema.side;
                
                if (coorX < 6 || coorY < 6 || coorX > 100*side-6 || coorY > 100*side-6) {
                    return;
                }
                //evento para hacer hover de paredes
                if ((coorX+5)%side <= 10){
                    franjaX = Math.floor((coorX+5) / side);
                    franjaY = Math.floor(coorY / side);
                    
                    if (this.hover != "vertical" || this.franjaX != franjaX || this.franjaY != franjaY) {
                        $("#pared-vertical").css("left", side*franjaX-3-mundo.pan[0]).css("bottom", side*franjaY+2-mundo.pan[1]).show();
                        $("#pared-horizontal").hide();
                    }
                    return;
                }
                if ((coorY+5)%side <= 10){
                    franjaX = Math.floor(coorX/side);
                    franjaY = Math.floor((coorY+5)/side);
                    
                    if (this.hover!="horizontal" || this.franjaX!=franjaX || this.franjaY!=franjaY){
                        $("#pared-horizontal").css("left", side*franjaX-2-mundo.pan[0]).css("bottom", side*franjaY+1-mundo.pan[1]).show();
                        $("#pared-vertical").hide();
                    }
                }
                else {
                    if (this.hover != "otro") {
                        $("#pared-vertical,#pared-horizontal").hide();
                    }
                }
            }, false);
        }
    }
    
    Drawer.prototype = {
        draw: function (soloParedes) {
            var canvas = this.canvas,
                ctx = this.ctx,
                coor, montonCode;
            soloParedes = soloParedes || false;
            if (soloParedes) {
                this.dibujaParedes();
            }
            else {
                //si aun no estan los recursos (imagenes) listos, no podemos dibujar
                if (!KAREL.drawing.recursosListos) {
                    console.log("no listos");
                    return;
                }
                console.log("draw");
                
                this.dibujaFondo();
                this.dibujaParedes();
                this.dibujaKarel();
                //dibujar zumbadores
                ctx.font = KAREL.drawing.tema.fontStyle;
                ctx.textAlign = "center";
                for (montonCode in this.mundo.zumbadores.montones) {
                    coor = this.mundo.zumbadores.fromCode(Number(montonCode));
                    this.dibujaMonton(coor[0], coor[1], this.mundo.zumbadores.montones[montonCode]);
                }
            }
        },
        //Dibuja una sola casilla del mundo sin afectar lo demás
        dibujaCasilla: function(x, y) {
            var pan = this.mundo.pan,
                side = KAREL.drawing.tema.side;
            //fondo, solo dibujar el relleno/centro para evitar borras las paredes de los ejes
            this.ctx.drawImage(fondo, 1, 2, 29, 29, (x-1)*side-pan[0]+1, this.canvas.height-y*side+pan[1]+2, 29, 29);
            //karel
            this.dibujaKarel();
            //zumbadores
            this.dibujaMonton(x, y, this.mundo.zumbadores.get(x,y));
        },
        
        dibujaFondo: function() {
            var canvas = this.canvas,
                ctx = this.ctx,
                pan = this.mundo.pan,
                tema = KAREL.drawing.tema,
                side = tema.side,
                firstX = Math.max(Math.floor(pan[0] / side), 0),
                firstY = Math.max(Math.floor(pan[1] / side), 0),
                lastX = Math.min(Math.ceil((canvas.width + pan[0]) / side), 100),
                lastY = Math.min(Math.ceil((canvas.height + pan[1]) / side), 100),
                i,j;
            //borrar todo
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = tema.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //dibujar calles del mundo
            for (i = firstX; i < lastX; i++) {
                for (j = firstY; j < lastY; j++) {
                    ctx.drawImage(fondo, i*side - pan[0], canvas.height - j*side - side + pan[1]);
                }
            }
            //dibujar ejes
            ctx.beginPath();
            ctx.strokeStyle = tema.wallColor;
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            var top = canvas.height - (side*lastY - pan[1] - 0.5),
                left = -0.5 - pan[0],
                bottom = canvas.height + 0.5 + pan[1],
                right = side*lastX - pan[0] - 0.5;
            ctx.moveTo(left, top);
            ctx.lineTo(left, bottom);
            ctx.lineTo(right, bottom);
            ctx.lineTo(right, top);
            ctx.lineTo(left, top);
            ctx.stroke();
            //dibujar numeros en los ejes
            ctx.font = tema.font;
            ctx.fillStyle = tema.fontColor;
            ctx.textAlign = "center";
            for (i = firstX + 1; i < lastX + 1; i++) {
                ctx.fillText(i, i*side - 16 - pan[0], canvas.height + 15 + pan[1]);
                ctx.fillText(i, i*side - 16 - pan[0], canvas.height - 5 + pan[1] - 100*side);
            }
            ctx.textAlign = "right";
            for (i = firstY + 1; i < lastY + 1; i++) {
                ctx.fillText(i, -8 - pan[0], canvas.height - i*side + 20 + pan[1]);
                
            }
            ctx.textAlign = "left";
            for (i = firstY + 1; i < lastY + 1; i++) {
                ctx.fillText(i, 4 - pan[0] + 100 * side, canvas.height - i * side + 20 + pan[1]);
            }
        },
        
        dibujaParedes: function() {
            var ctx = this.paredesCtx,
                paredCode;
            //Borrar las paredes
            ctx.clearRect(0, 0, this.paredesLayer.width, this.paredesLayer.height);
            ctx.strokeStyle = KAREL.drawing.tema.wallColor;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (paredCode in this.mundo.paredes.muros){
                var aux = this.mundo.paredes.fromCode(paredCode),
                    renglon = aux[0],
                    columna = aux[1],
                    tipo = aux[2],
                    flujo = this.mundo.paredes.muros[paredCode];
                this.dibujaPared(columna, renglon, tipo, flujo);
            }
        },
        
        //Dibuja una pared en el mundo relativas al conteo de paredes
        dibujaPared: function (x, y, direccion, flujo) {
            var s = KAREL.drawing.tema.side;
            if (direccion == "vertical") {
                if (flujo == 2) {
                    //dibujar pared vertical
                    this.moveTo(this.paredesCtx, x*s - 0.5, y*s + s - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s - 0.5);
                }
                if (flujo == 0) {
                    //flecha izquierda
                    this.moveTo(this.paredesCtx, x*s - 0.5, y*s + s - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s + 21 - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 5 - 0.5, y*s + 16 - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s + 11 - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s - 0.5);
                }
                else if (flujo == 1) {
                    //flecha derecha
                    this.moveTo(this.paredesCtx, x*s - 0.5, y*s + s - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s + 21 - 0.5);
                    this.lineTo(this.paredesCtx, x*s + 5 - 0.5, y*s + 16 - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s + 11 - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s - 0.5);
                }
            }
            else if (direccion == 'horizontal') {
                if (flujo == 2) {
                    //dibujar pared horizontal
                    this.moveTo(this.paredesCtx, x*s + s - 0.5, y*s - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s - 0.5);
                }
                else if (flujo == 0) {
                    //flecha abajo
                    this.moveTo(this.paredesCtx, x*s + s - 0.5, y*s - 0.5);
                    this.lineTo(this.paredesCtx, x*s + 21 - 0.5, y*s - 0.5);
                    this.lineTo(this.paredesCtx, x*s + 16 - 0.5, y*s - 5 - 0.5);
                    this.lineTo(this.paredesCtx, x*s + 11 - 0.5, y*s - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s - 0.5);
                }
                else if (flujo==1){
                    //flecha arriba
                    this.moveTo(this.paredesCtx, x*s + s - 0.5, y*s - 0.5);
                    this.lineTo(this.paredesCtx, x*s + 21 - 0.5, y*s - 0.5);
                    this.lineTo(this.paredesCtx, x*s + 16 - 0.5, y*s + 5 - 0.5);
                    this.lineTo(this.paredesCtx, x*s + 11 - 0.5, y*s - 0.5);
                    this.lineTo(this.paredesCtx, x*s - 0.5, y*s - 0.5);
                }
            }
            this.paredesCtx.stroke();
        },
        
        dibujaKarel: function() {
            var x = this.mundo.karelX,
                y = this.mundo.karelY,
                orientacion = this.mundo.orientacion,
                side = KAREL.drawing.tema.side,
                imagen;
            switch (orientacion) {
            case 'norte':
                imagen = KNorte;
                break;
            case 'este':
                imagen = KEste;
                break;
            case 'sur':
                imagen = KSur;
                break;
            case 'oeste':
                imagen = KOeste;
                break;
            }
            this.ctx.drawImage(imagen, x*side+5-side - this.mundo.pan[0], this.canvas.height + this.mundo.pan[1] - y*side+6);
        },
        
        dibujaKarel2: function (x1, y1, x2, y2, a) {
            var x = a*x1 + (1 - a)*x2,
                y = a*y1 + (1 - a)*y2,
                orientacion = this.mundo.orientacion,
                side = KAREL.drawing.tema.side,
                imagen;
            switch (orientacion) {
            case 'norte':
                imagen = KNorte;
                break;
            case 'este':
                imagen = KEste;
                break;
            case 'sur':
                imagen = KSur;
                break;
            case 'oeste':
                imagen = KOeste;
                break;
            }
            this.ctx.drawImage(imagen, x*side+5-side - this.mundo.pan[0], this.canvas.height + this.mundo.pan[1] - y*side+6);
        },
        
        //Dibuja un monton de zumbadores en el mundo relativo al conteo de casillas
        dibujaMonton: function(x, y, monton) {
            var ctx = this.ctx,
                canvas = this.canvas,
                tema = KAREL.drawing.tema,
                side = tema.side;
            if (monton > 0) {
                ctx.beginPath();
                ctx.arc(x*side - 16 - 0.5 - this.mundo.pan[0], canvas.height - (y*side - 16 - 0.5) + this.mundo.pan[1], 8.5, 0, Math.PI*2, false);
                ctx.closePath();
                ctx.fillStyle = tema.fillZumbador;
                ctx.fillStyle="rgba(232,134,0,0.8)";
                ctx.fill();
                ctx.fillStyle = tema.fontColor;
                if (monton == Infinity) {
                    monton = "∞";
                }
                ctx.fillText(monton, x*side - 16 - 1 - this.mundo.pan[0], canvas.height - (y*side - 20.5) + this.mundo.pan[1]);
            }
        },

        //wrappers para ctx.moveTo y ctx.lineTo, coordenadas relativas al mundo de karel en pixeles
        moveTo: function (ctx, x, y) {
            ctx.moveTo(x - this.mundo.pan[0], this.canvas.height - y + this.mundo.pan[1]);
        },
        lineTo: function (ctx, x, y) {
            ctx.lineTo(x - this.mundo.pan[0], this.canvas.height - y + this.mundo.pan[1]);
        }
    };
    
    return {
        //propiedades
        tema: temas.Grid,
        recursosListos: false,
        //metodos
        changeTheme: changeTheme,
        Drawer: Drawer
    };
}());
