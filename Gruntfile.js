module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            jquery: {
                options: {
                    
                },
                files: {
                    'build/jquery-pack.min.js' : [
                        'jquery/jquery-1.6.2.min.js',
                        'jquery/jquery-ui-1.11.0.min.js',
                        'jquery/flexigrid.pack.js']
                }
            },
            ace: {
                files: {
                    'build/ace-pack.min.js': [
                        'src/ace.js',
                        'src/theme-twilight.js',
                        'src/theme-capek.js',
                        'src/mode-karel.js'
                    ]
                }
            },
            karel: {
                files: {
                    'build/karel-pack.js' : [
                        'init.js',
                        'karelDraw.js',
                        'mundo.js',
                        'javakarel.js',
                        'paskarel.js',
                        'compilador.js',
                        'maquinaVirtual.js'
                    ]
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'build/style.min.css': [
                        'style.css',
                        'jquery/css/jquery-ui.min.css',
                        'jquery/css/flexigrid/flexigrid.css'
                    ]
                }
            }
        },
        jison: {
            /*java: {
                files: { 'client/parser/javakarel.js': 'client/parser/javakarel.jison' }
            },
            pascal: {
                files: { 'client/parser/paskarel.js': 'client/parser/paskarel.jison' }
            },*/
            python: {
                options: { moduleName: 'pythonkarel'},
                files: { 'client/parser/pythonkarel.js': 'client/parser/pythonkarel.jison' }
            }
        },
        execute: {
            buildace: {
                options: {
                    args: ['-m']
                },
                src: ['../ace/Makefile.dryice.js']
            }
        },
        copy: {
            highlight: {
                expand: true,
                flatten: true,
                src: ['../ace/build/src-min/mode-*karel.js'],
                dest: 'client/ace-src/'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jison');
    grunt.loadNpmTasks('grunt-execute');
    
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);
    
    grunt.registerTask('localization', 'Trololo', function () {
        grunt.log.write("Generating localization Json files...").ok();
        var LANG_COUNT = 2,
            languages = ["english", "spanish"],
            output = [],
            lines = grunt.file.read("client/localization/localization.csv").split("\r\n");
        for (var i = 0; i < LANG_COUNT; i++) {
            output.push({
                dom: []
            });
        }
        for (var i = 1; i < lines.length; i++) {
            grunt.log.writeln("Line " + i + ": " + lines[i]);
            var localizations = lines[i].split(",");
            if (localizations.length < 3) break;
            for (var j = 0; j < LANG_COUNT; j++) {
                
                if (localizations[0].indexOf("$") === 0) {
                    // This is a variable
                    output[j][localizations[0]] = localizations[1 + j];
                }
                else {
                    output[j].dom.push({
                        id: localizations[0],
                        content: localizations[1 + j]
                    });
                }
            }
        }
        for (var i = 0; i < LANG_COUNT; i++) {
            grunt.file.write("client/localization/localization." + languages[i] + ".js",
                "KAREL.localization = " +
                JSON.stringify(output[i], null, 4)
            );
        }
    });
    
    grunt.registerTask('parser', ['jison']);
    
    grunt.registerTask('highlight', ['execute:buildace', 'copy:highlight']);
    grunt.registerTask('highlightcopy', ['copy:highlight']);
};
