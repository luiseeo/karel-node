/**
 * ============
 * Karel online
 * ============
 * Rutinas de inicialización. Poner los eventos de los botones y
 * demás elementos de la GUI. Instanciar las rutinas de pintado para
 * la edición de mundo y la ejecución de mundo.
 * 
 */

"use strict";
var KAREL = {};

window.requestAnimationFrame =
    window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

KAREL.utils = (function () {
    var nombrePrograma,
        nombreMundo,
        erroresSize,
        mundoElement,
        layerParedesMundo,
        mundoEjecucion,
        layerParedesEjecucion,
        javaRadio,
        modePascal,
        modeJava;
    
    //inicializaciones a hacer una vez que este listo el DOM
    $(document).ready(function () {
        var Utils = KAREL.utils,
            Drawing = KAREL.drawing,
            ModePascal = require("ace/mode/pascalkarel").Mode,
            ModeJava = require("ace/mode/karel").Mode;
        modePascal = new ModePascal();
        modeJava = new ModeJava();
        mundoElement = document.getElementById('edicion-mundo');
        layerParedesMundo = document.getElementById('edicion-layer-paredes');
        mundoEjecucion = document.getElementById('ejecucion-mundo');
        layerParedesEjecucion = document.getElementById('ejecucion-layer-paredes');
        javaRadio = $("#lenguaje #java");
        //cargar el editor de texto
        Utils.editorPrograma = ace.edit("editor-programa");
        Utils.editorPrograma.setTheme("ace/theme/capek");
        //Disponibles: kr_theme,twilight,twilight
        Utils.editorPrograma.renderer.setShowPrintMargin(false);
        Utils.editorPrograma.getSession().setMode(modeJava);
        document.getElementById("editor-programa").style.fontSize = "14px";
        //editor de texto de ejecucion
        Utils.editorEjecucion = ace.edit("editor-ejecucion");
        Utils.editorEjecucion.setTheme("ace/theme/capek");
        Utils.editorEjecucion.renderer.setShowPrintMargin(false);
        Utils.editorEjecucion.getSession().setMode(modeJava);
        Utils.editorEjecucion.setReadOnly(true);
        document.getElementById("editor-ejecucion").style.fontSize = "14px";

        //editor de mundos
        Utils.edicionDrawing = new Drawing.Drawer("edicion-mundo", "edicion-layer-paredes");
        //mundo de ejecucion (en readonly)
        Utils.ejecucionDrawing = new Drawing.Drawer("ejecucion-mundo", "ejecucion-layer-paredes", true);
    });
    
    //funciones
    function rellenoVertical() {
        var activeTab = $('li.ui-state-active a').prop("id");
        $('#tabs section').height($('body').outerHeight() - $('ul.ui-tabs-nav').outerHeight(true));
        switch (activeTab) {
            case "tab-world":
                //el tamaño del canvas editor de mundo, NOTE: no puede hacerse con $().width ó $().height
                mundoElement.height = $('#tabs section').height() - $('#toolbarMundo').outerHeight(true);
                mundoElement.width = $('#tabs section').width();
                layerParedesMundo.height = mundoElement.height;
                layerParedesMundo.width = mundoElement.width;
                mundo.pan[0] = Math.min(mundo.pan[0], 100 * 32 - this.edicionDrawing.canvas.width + 40);
                mundo.pan[1] = Math.min(mundo.pan[1], 100 * 32 - this.edicionDrawing.canvas.height + 40);
                this.edicionDrawing.draw();
                break;
            case "tab-code":
                //el tamaño de la tabla de errores puede ser la tabla completa o solo su header
                erroresSize = (this.showError) ?
                    $('#errores').outerHeight(true) :
                    $('.ftitle').outerHeight(true);
                $('#editor-programa').height($('#tabs section').height() - $('#toolbarPrograma').outerHeight(true) - erroresSize);
                this.editorPrograma.resize();
                break;
            case "tab-run":
                //el tamaño del editor en ejecucion
                $('#editor-ejecucion').height($('#tabs section').height() - $('#toolbarEjecucion').outerHeight(true));
                this.editorEjecucion.resize();
                //tamaño del canvas de ejecucion
                mundoEjecucion.height = $('#tabs section').height() - $('#toolbarEjecucion').outerHeight(true);
                mundoEjecucion.width = $('#tabs section#ejecutar').width() - $('#editor-ejecucion').width();
                layerParedesEjecucion.height = mundoEjecucion.height;
                layerParedesEjecucion.width = mundoEjecucion.width;
                this.ejecucionDrawing.mundo.height = mundoEjecucion.height;
                this.ejecucionDrawing.mundo.width = mundoEjecucion.width;
                this.ejecucionDrawing.draw();
                $('#tapon').height($('#editor-ejecucion').height() - 16);
                break;
        }
    }
    
    function toggleErrores() {
        if (this.showError) {
            $('.flexigrid').children(':not(.mDiv)').hide()
            this.showError = false;
        }
        else {
            $('.flexigrid').children(':not(.mDiv)').show()
            this.showError = true;
        }
        this.rellenoVertical();
    }

    function toggleLenguaje() {
        console.log("Cambiando a " + javaRadio.prop("checked"));
        if (javaRadio.prop("checked")) {
            this.editorPrograma.getSession().setMode(modeJava);
            this.editorEjecucion.getSession().setMode(modeJava);
        }
        else {
            this.editorPrograma.getSession().setMode(modePascal);
            this.editorEjecucion.getSession().setMode(modePascal);
        }
    }
    function setCasilla(valor) {
        mundo.zumbadores.poner(mundo.clickX, mundo.clickY, valor);
        $('#menu').dialog('close');
        this.edicionDrawing.draw();
    }
    function showMessageBox(titulo, mensaje, tipo) {
        var mensajeHTML='<p><span style="float:left; margin:0 7px 20px 0;" class="ui-icon ui-icon-'+tipo+'"></span>'+mensaje+'</p>';
        $("#generic-dialog").dialog({
            title:titulo,
            resizable:false,
            height:180,
            modal:true,
            buttons: {
                Ok: function(){
                    $(this).dialog("close");
                }
            }
        }).html(mensajeHTML);
    }
    function showMundoChooser() {
        $.get("server/listaMundos.php",function(response) {
            $("#chooser").html(response);
        });
        $("#chooser").dialog({
            title:"Escoge un mundo",
            resizable:false,
            height:180,
            model:true
        });
    }
    function showProgramChooser() {
        $.get("server/listaProgramas.php",function(response) {
            $("#chooser").html(response);
        });
        $("#chooser").dialog({
            title:"Escoge un programa",
            resizable:false,
            height:180,
            modal:true
        });
    }
    //funciones toolbar MUNDO
    function abrirMundo(archivo) {
        $.get("server/mundos/"+archivo, function(content) {
            //cargar el mundo, solo cargar los datos (cuidado con sobreescribir funciones)
            var mundoJSON = JSON.parse(content);
            mundo.zumbadores.enMochila = mundoJSON.zumbadores.enMochila;
            mundo.zumbadores.montones = mundoJSON.zumbadores.montones;
            mundo.paredes.muros = mundoJSON.paredes.muros;
            mundo.karelX = mundoJSON.karelX;
            mundo.karelY = mundoJSON.karelY;
            mundo.orientacion = mundoJSON.orientacion;
            KAREL.utils.edicionDrawing.draw();
        });
        nombreMundo = archivo;
        $("#chooser").dialog("close");
    }
    function nuevoMundo() {
        mundo.zumbadores.enMochila = 0;
        mundo.zumbadores.montones = {};
        mundo.paredes.muros = {};
        mundo.karelX = 1;
        mundo.karelY = 1;
        mundo.orientacion = "norte";
        this.edicionDrawing.draw();
    }
    function guardarMundo() {
        if (nombreMundo === undefined){
            showMessageBox("Error","No se ha abierto ningún mundo todavía","");
            return;
        }
        $.post("server/subirMundo.php",{
                nombre: nombreMundo,
                mundo: JSON.stringify(mundo)
            }, function (response) {
                if (response === "fail"){
                    showMessageBox("Error","Hubo un error al intentar guardar el mundo","");
                }
            }
        );
    }
    function guardarComoMundo() {
        var re = /^[a-zA-Z0-9]+$/,
            filename;
        $("#guardar-como-dialog").dialog({
            resizable: false,
            height: 180,
            modal: true,
            buttons: {
                Ok: function () {
                    filename = $('#nombre-guardar-como').prop('value');
                    if (re.test(filename)) {
                        //hacer una petición al servidor para guardar el archivo
                        $.post("server/subirMundo.php",{
                                nombre: filename,
                                mundo: JSON.stringify(mundo)
                            }
                        );
                        $('#error-guardar-como').text('');
                        $(this).dialog( "close" );
                    }
                    else {
                        $('#error-guardar-como').text('Solo son permitidos caractéres alfanuméricos.');
                    }
                },
                Cancel: function() {
                    $('#error-guardar-como').text('');
                    $(this).dialog( "close" );
                }
            }
        });
    }
    
    //funciones toolbar PROGRAMA
    function zoomIn() {
        var currentFontSize = document.getElementById("editor-programa").style.fontSize;
        var numberFontSize = Number(currentFontSize.substr(0, currentFontSize.length - 2));
        numberFontSize += 2;

        var newfontSize = numberFontSize + "px";
        document.getElementById("editor-programa").style.fontSize = newfontSize;
        document.getElementById("editor-ejecucion").style.fontSize = newfontSize;
    }
    function zoomOut() {
        var currentFontSize = document.getElementById("editor-programa").style.fontSize;
        var numberFontSize = Number(currentFontSize.substr(0, currentFontSize.length - 2));
        numberFontSize -= 2;
        // Set the minimum allowable size to 4px
        if (numberFontSize < 4) numberFontSize = 4;

        var newfontSize = numberFontSize + "px";
        document.getElementById("editor-programa").style.fontSize = newfontSize;
        document.getElementById("editor-ejecucion").style.fontSize = newfontSize;
    }
    function abrirPrograma(archivo) {
        $.get("server/programas/"+archivo, function (content) {
            KAREL.utils.editorPrograma.getSession().setValue(content);
        });
        nombrePrograma = archivo;
        $("#chooser").dialog("close");
    }
    function nuevoPrograma() {
        //llenar con el código fuente inicial
        if( $("#pascal").prop('checked')){
            this.editorPrograma.getSession().setValue("iniciar-programa\n\n"+
                "	inicia-ejecucion\n"+
                "		apagate;\n"+
                "	termina-ejecucion\n"+
                "finalizar-programa");
        } else{
            this.editorPrograma.getSession().setValue("class program{\n\n"+
                "	program(){\n"+
                "		turnoff();\n"+
                "	}\n"+
                "}");
        }
    }
    function guardarPrograma(){
        if (nombrePrograma === undefined){
            Utils.showMessageBox("Error", "No se ha abierto ningún programa todavía", "");
            return;
        }
        $.post("server/subirPrograma.php", {
                nombre: nombrePrograma,
                codigo: editorPrograma.getSession().getValue()
            }, function(response){
                if (response=="fail")
                    showMessageBox("Error","Hubo un error al intentar guardar el programa","");
            }
        );
    }
    function guardarComoPrograma() {
        var re = /^[a-zA-Z0-9]+$/,
            filename;
        $("#guardar-como-dialog").dialog({
            resizable: false,
            height: 180,
            modal: true,
            buttons: {
                Ok: function() {
                    filename = $('#nombre-guardar-como').prop('value');
                    if (re.test(filename)){
                        //hacer una petición al servidor para guardar el archivo
                        $.post("server/subirPrograma.php",{
                                nombre: filename,
                                codigo: editorPrograma.getSession().getValue()
                            }
                        );
                        $('#error-guardar-como').text('');
                        $(this).dialog( "close" );
                    }
                    else{
                        $('#error-guardar-como').text('Solo son permitidos caractéres alfanuméricos.');
                    }
                },
                Cancel: function() {
                    $('#error-guardar-como').text('');
                    $(this).dialog( "close" );
                }
            }
        });    
    }
    
    //funciones de panneo del mundo
    function panIzq() {
        $('#mueve-izq').focus();
        mundo.pan[0] -= 200;
        mundo.pan[0] = Math.max(mundo.pan[0], -40);
        this.edicionDrawing.draw();
    }
    function panDer() {
        $('#mueve-der').focus();
        mundo.pan[0] += 200;
        mundo.pan[0] = Math.min(mundo.pan[0], 100*32 + 40 - this.edicionDrawing.canvas.width);
        this.edicionDrawing.draw();
    }
    function panArr() {
        $('#mueve-arr').focus();
        mundo.pan[1] += 200;
        mundo.pan[1] = Math.min(mundo.pan[1], 100*32 + 40 - this.edicionDrawing.canvas.height);
        this.edicionDrawing.draw();
    }
    function panAba() {
        $('#mueve-aba').focus();
        mundo.pan[1] -= 200;
        mundo.pan[1] = Math.max(mundo.pan[1], -40);
        this.edicionDrawing.draw();
    }
    
    //funcion para indicar el highlight de una linea en ejecucion
    function highlightLine(line) {
        this.editorEjecucion.gotoLine(line);
    }
    
    //funcion para posicionar a Karel en el mundo
    function posiciona(x, y, orientacion) {
        mundo.setPosicion(x, y, false);
        mundo.setOrientacion(orientacion);
        $('#menu').dialog('close');
        this.edicionDrawing.draw();
    }
    
    //Mostrar un dialogo para indicar los zumbadores en una casilla
    function preguntaMonton() {
        $("#zumbadores-dialog").dialog({
            resizable: false,
            height:180,
            modal: true,
            buttons: {
                Ok: function () {
                    var re=/^[0-9]*$/;
                    var s=$('#cantidad-zumbadores').prop('value');
                    if (re.test(s)){
                        var cantidad=Number(s);
                        
                        if (cantidad>100){
                            $('#error-cantidad-zumbadores').text('El máximo valor posible es 100.');
                            KAREL.utils.setCasilla(100);
                        }
                        else{
                            KAREL.utils.setCasilla(s);
                            $('#error-cantidad-zumbadores').text('');
                            $(this).dialog( "close" );
                        }
                    }
                    else{
                        $('#error-cantidad-zumbadores').text('Sólo son válidos números enteros positivos.');
                    }
                },
                Cancel: function() {
                    $('#error-cantidad-zumbadores').text('');
                    $( this ).dialog( "close" );
                    $('#menu').dialog('close');
                }
            }
        });
    }
    
    //API pública
    return {
        //propiedades
        showError: true,
        edicionDrawing: undefined,
        ejecucionDrawing: undefined,
        editorPrograma: null,
        editorEjecucion: undefined,
        //metodos
        rellenoVertical: rellenoVertical,
        toggleLenguaje: toggleLenguaje,
        toggleErrores: toggleErrores,
        setCasilla: setCasilla,
        showMessageBox: showMessageBox,
        showMundoChooser: showMundoChooser,
        showProgramChooser: showProgramChooser,
        abrirMundo: abrirMundo,
        nuevoMundo: nuevoMundo,
        guardarMundo: guardarMundo,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        abrirPrograma: abrirPrograma,
        nuevoPrograma: nuevoPrograma,
        guardarPrograma: guardarPrograma,
        panIzq: panIzq,
        panDer: panDer,
        panArr: panArr,
        panAba: panAba,
        highlightLine: highlightLine,
        posiciona: posiciona,
        preguntaMonton: preguntaMonton,
        getMundoEjecucion: function(){
            return mundoEjecucion;
        }
    };
}());

KAREL.compilador = (function () {
    var Utils = KAREL.utils,
        displayErrores;
        
    $(document).ready(function () {
        displayErrores = document.getElementById("errores");
    });
    
    //funciones
    function compile() {
        var salida = {},
            rows = [],
            serror;
        try {
            programaCompilado.fuente = Utils.editorPrograma.getSession().getValue();
            if (document.getElementById("java").checked) {
                programaCompilado.get(javakarel);
            }
            else {
                programaCompilado.fuente = programaCompilado.fuente.toLowerCase();
                programaCompilado.get(paskarel)
            }
            if (programaCompilado.errores.length != 0){
                errores.forEach(function (error) {
                    rows.push({cell:[error.lineNo,error.message]});
                });
                salida.total = errores.lenght;
                salida.page = 1;
                salida.rows = rows;
                
                programaCompilado.cuadruplos = undefined;
                programaCompilado.fuente = "";
                Utils.showMessageBox("Error","Hubo errores de compilación","closethick");
                if (!Utils.showError) {
                    Utils.toggleErrores();
                }
            }
            else {
                salida.total = 1;
                salida.page = 1;
                salida.rows = [{cell:[":D","¡Compilación exitosa!"]}];
                Utils.showMessageBox("Compilación correcta", "Programa compilado exitosamente", "info");
                if (Utils.showError) {
                    Utils.toggleErrores();
                }
            }
        }
        catch (error){
            serror = String(error);
            //quitar los tabs para que los errores se despliegue bien
            serror = serror.replace(/\t/g," ");
            salida.total = 1;
            salida.page = 1;
            salida.rows = [{cell:[1,serror]}];
            programaCompilado.cuadruplos = undefined;
            programaCompilado.fuente = "";
            Utils.showMessageBox("Error", "Hubo errores de compilación", "closethick");
            if (!Utils.showError) {
                Utils.toggleErrores();
            }
        }
        $('#tabla-errores').flexAddData(salida);
    }
    
    //preparar todo para empezar a ejecutar
    function initialize() {
        //copiar el mundo
        Utils.ejecucionDrawing.mundo = $.extend(true, {}, mundo);
        Utils.ejecucionDrawing.draw();
        Utils.editorEjecucion.gotoLine(0);
        $("#zumbadores-ejecucion").text($("#en-mochila").prop("value"));
        //inicializar la maquina virtual
        if (maquinavirtual.initialize(programaCompilado.cuadruplos, programaCompilado.commands, Utils.ejecucionDrawing.mundo) > 0) {
            Utils.showMessageBox("Error", maquinavirtual.error, "closethick");
        }
        else {
            maquinavirtual.mode = maquinavirtual.karelmodes.ready;
        }
    }
    
    //Ejecutar un solo paso y desplegar los mensajes en caso de ser necesario.
    function step() {
        var options = {};
        switch (maquinavirtual.execute()) {
        case 1:
            maquinavirtual.mode = maquinavirtual.karelmodes.notready;
            Utils.showMessageBox("Error", maquinavirtual.error, "closethick");
            options = {
                label: "Correr",
                icons: { primary: "ui-icon-play" }
            };
            $("#correr").button("option", options);
            return 1;
        case 0:
            maquinavirtual.mode = maquinavirtual.karelmodes.notready;
            options = {
                label: "Correr",
                icons: { primary: "ui-icon-play" }
            };

            $("#correr").button("option", options);
            Utils.showMessageBox("Info", "Ejecución finalizada. Terminación normal.", "check");
            return 0;
        }
        return 2;
    }

    var animationRequest = 0;
    var timeout = null;
    function aniStep(timestamp) {
        var start = new Date().getTime();
        // Sleep
        if (KAREL.compilador.retraso > 0) {
            timeout = setTimeout(smoothStep, KAREL.compilador.retraso, start);
        }
        else {
            smoothStep(start);
        }
    }
    function smoothStep(start) {
        var progress,
            stepResult;
        while (true) {
            progress = new Date().getTime() - start;
            stepResult = step();
            // Aim for 60fps
            if (progress > 16.6 || stepResult < 2) {
                break;
            }
        }
        if (stepResult >= 2) {
            animationRequest = requestAnimationFrame(aniStep);
        }
        else {
            KAREL.utils.highlightLine(maquinavirtual.currentLine);
        }
    }

    //Funcion que ejecuta todos los cuadruplos de acuerdo al retraso indicado hasta terminar.
    function run() {
        switch (maquinavirtual.mode) {
        case maquinavirtual.karelmodes.notready:
            this.initialize();
            break;
        case maquinavirtual.karelmodes.running:
            clearTimeout(timeout);
            if (animationRequest !== null) {
                KAREL.utils.highlightLine(maquinavirtual.currentLine);
                cancelAnimationFrame(animationRequest);
                animationRequest = null;
            }   
            maquinavirtual.mode = maquinavirtual.karelmodes.ready;
            return;
        }
        maquinavirtual.mode = maquinavirtual.karelmodes.running;
        
        animationRequest = requestAnimationFrame(aniStep);
    }
    
    //public API
    return {
        //propiedades
        retraso: 500,
        //metodos
        compile: compile,
        initialize: initialize,
        step: step,
        run: run
    };
}());

function loadLanguage(language) {
    KAREL.localization.dom.forEach(function (translation) {
        var element = document.getElementById(translation.id);
        if (element !== null) {
            element.innerText = translation.content;
        }
        else {
            console.log(translation.id + " element not found");
        }
    });
}

//Inicializar al cargar el DOM:
$(document).ready(function() {
    //dependencias
    var Utils = KAREL.utils,
        Compilador = KAREL.compilador,
        Localization = KAREL.localization,
        retrasoEl = $("#delay"),
        //returns an icon object as required by jQuery UI
        icon = function (iconName) {
            return {
                icons: {
                    primary: 'ui-icon-' + iconName
                }
            };
        },
        noTextIcon = function (iconName, label) {
            return {
                text: false,
                label: label,
                icons: {
                    primary: 'ui-icon-' + iconName
                }
            };
        },
        //Wrapping function to type less in UI callbacks, sets "this" to KAREL.utils
        WF = function (fun) {
            return function () {
                fun.call(KAREL.utils, null);
            };
        },
        //Wrapping function to type less in UI callbacks, sets "this" to KAREL.compilador
        WC = function (fun) {
            return function () {
                fun.call(KAREL.compilador, null);
            };
        };
    // Cargar la localización
    loadLanguage("english");

    //crear las tabs
    var isHelpLoaded = false;
    $("#tabs").tabs({
        activate: function (event, ui) {
            var activeTab = $('li.ui-state-active a').prop("id");
            Utils.rellenoVertical();
            if (activeTab == "tab-run") {
                Utils.editorEjecucion.getSession().setValue(programaCompilado.fuente);
                if ($('#infinite').prop('checked')) {
                    mundo.zumbadores.enMochila = Infinity;
                }
                else {
                    if (isNaN($('#en-mochila').prop('value')))
                        $('#en-mochila').prop('value','0');
                    mundo.zumbadores.enMochila = $('#en-mochila').prop('value');
                }
                $('#zumbadores-ejecucion').text(mundo.zumbadores.enMochila);
            }
            else if (activeTab == "tab-help") {
                if (!isHelpLoaded) {
                    $.get("help.html", function (data) {
                        $("#ayuda").html(data);
                        isHelpLoaded = true;
                    });
                }
            }
        }
    });
    
    //botones en pestaña "Mundo"
    $("#toolbarMundo button#new-world").button(icon('document')).click(WF(Utils.nuevoMundo));
    $("#toolbarMundo button#open-world").button(icon('folder-open')).click(WF(Utils.showMundoChooser));
    $("#toolbarMundo button#save-world").button(icon('disk')).click(WF(Utils.guardarMundo));
    $("#toolbarMundo button#save-as-world").button(icon('disk')).click(WF(Utils.guardarComoMundo));
    $("#toolbarMundo input#infinite").button(icon('link'));
    $("#toolbarMundo input#valve").button(icon('transfer-e-w'));
    $("#toolbarMundo button#mueve-izq").button(icon('arrowthick-1-w')).click(WF(Utils.panIzq));
    $("#toolbarMundo button#mueve-arr").button(icon('arrowthick-1-n')).click(WF(Utils.panArr));
    $("#toolbarMundo button#mueve-aba").button(icon('arrowthick-1-s')).click(WF(Utils.panAba));
    $("#toolbarMundo button#mueve-der").button(icon('arrowthick-1-e')).click(WF(Utils.panDer));
    $("#menu").on({ "contextmenu": function (e) { e.preventDefault(); } });
    
    //botones en pestaña "Programa"
    $("#toolbarPrograma #lenguaje #java").prop("checked","checked");
    $("#toolbarPrograma #lenguaje").buttonset().click(WF(Utils.toggleLenguaje));
    $("#toolbarPrograma #zoom-tools").buttonset();
    $("#toolbarPrograma button#zoom-in").button(noTextIcon('zoomin', 'Text zoom-in')).click(WF(Utils.zoomIn));
    $("#toolbarPrograma button#zoom-out").button(noTextIcon('zoomout', 'Text zoom-out')).click(WF(Utils.zoomOut));
    $("#toolbarPrograma button#new-program").button(icon('document')).click(WF(Utils.nuevoPrograma));
    $("#toolbarPrograma button#open-program").button(icon('folder-open')).click(WF(Utils.showProgramChooser));
    $("#toolbarPrograma button#save-program").button(icon('disk')).click(WF(Utils.guardarPrograma));
    $("#toolbarPrograma button#save-as-program").button(icon('disk')).click(WF(Utils.guardarComoPrograma));
    $("#toolbarPrograma button#compile").button(icon('circle-triangle-e')).click(WC(Compilador.compile));
    
    //botones en pestaña "Ejecutar"
    $("#toolbarEjecucion button#initialize").button(icon('seek-first')).click(WC(Compilador.initialize));
    $("#toolbarEjecucion button#step").button(icon('seek-next')).click(WC(Compilador.step));
    $("#toolbarEjecucion button#run").button(icon('play')).click(function() {
        var options = ( $(this).text() === Localization.$run ) ?
            {
                label: Localization.$stop,
                icons: { primary: "ui-icon-pause" }
            } :
            {
                label: Localization.$run,
                icons: { primary: "ui-icon-play" }
            };
        $(this).button("option", options);
        Compilador.run();
    });
    //range input para delay
    $("#slider-retraso").slider({
        range: "min",
        value: 500,
        min: 0,
        max: 1000,
        slide: function(event, ui) {
            retrasoEl.text(ui.value + "ms");
            Compilador.retraso = ui.value;
        }
    });
    Compilador.retraso = $("#slider-retraso").slider("value");
    retrasoEl.text(Compilador.retraso + "ms");
    
    //Agregar eventos del teclado
    document.addEventListener("keydown",function(e){
        var presionada = String.fromCharCode(e.keyCode);
        $('.mueveMundo').blur();
        var activeTab = $('li.ui-state-active a').html();
        if (activeTab == "Mundo") {
            switch (presionada) {
            //shortcuts para panning del mundo
            case "A":
                Utils.panIzq();
                break;
            case "D":
                Utils.panDer();
                break;
            case "W":
                Utils.panArr();
                break;
            case "S":
                Utils.panAba();
                break;
            }
        }
    },true);
    
    //Poner la tabla de errores
    $('#tabla-errores').flexigrid({
        title: 'Errores',
        dataType: 'json',
        resizable: false,
        height: 100,
        colModel: [
            {display: '#línea', name : 'linea', width : 40, sortable : true, align: 'center'},
            {display: 'descripción', name : 'descripcion', width : 600, sortable : false, align: 'left'}
        ]
    });
    $('.ftitle').addClass('ui-widget-header').click(WF(Utils.toggleErrores));
    
    //scroll en edicionEjecion
    $('#tapon').bind('DOMMouseScroll', function(e){
        var dir=0;
        if (e.wheelDelta){
            dir = -e.wheelDelta;
        }
        else{
            dir = e.detail;
        }
        if (dir > 0)
            Utils.editorEjecucion.scrollPageDown();
        else
            Utils.editorEjecucion.scrollPageUp();
    });
    //rellenar el browser
    Utils.rellenoVertical();
    Utils.toggleErrores();
});

//En el evento de redimensionar hacer relleno
$(window).resize(function(){
    KAREL.utils.rellenoVertical();
});
