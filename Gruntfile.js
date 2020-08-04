module.exports=function(grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt,{
        useminPrepare: 'grunt-usemin'
    });
grunt.initConfig({
    sass: {
        dist: {
            files: [{
                expand:true,
                cwd:'css',
                src:['*.scss'],
                dest: 'css',
                ext:'.css'
            }]
        }
    },
    watch: {
        files:['css/*.scss'],
        tasks: ['css']
    },
    browserSync:{
        dev:{
            bsFiles:{
                src:[
                    'css/*.css',
                    '*.html',
                    'js/*.js'
                ]
            },
            options: {
                watchTask:true,
                server:{
                    baseDir:'./'
                }
            }
        }
    },
    imagemin:{
        dynamic:{
            files: [{
              expand:true,
              cwd:'./',
              src: 'img/*.{png,gif,jpg,jpeg}',
              dest:'dist/'
            }]
        }
    },
    copy:{
        html:{
            files:[{
                expand:true,
                dot:true,
                cwd:'./',
                src:['*.html'],
                dest:'dist'
            }]
        },
        fonts:{
            files:[{
                expand:true,
                dot:true,
                cwd:'node_modules/open-iconic/font',
                src:['fonts/*.*'],
                dest:'dist'
            }]
        }
    },
    clean :{
        build:{
            src:['dist/']
        }
    },
    cssmin:{
       dist:{}
    },
    ungly:{
        dist:{}
    },

    filerev: {
        options:{
               encoding:'utf8',
               algorithm: 'md5',
               length:20  
        },
        release:{
            files:[{
                src:[
                    'dist/js/*.js',
                    'dist/css/*.css',
                ]
            }]
        }
    },
    concat:{
        options:{
            separator:';'
        },
        dist:{}
    },
    useminPrepare:{
        foo :{
        dest:'dist',
        src:['index.html','Nosotros.html','precios.html','Reservar.html','Terminos.html']
    },
    options:{
        flow:{
            steps:{
                css:['cssmin'],
                js:['uglify']
            },
            post:{
                css:[{
                    name:'cssmin',
                    createConfig:function(context, block){
                        var generated = context.options.generated;
                        generated.options={
                            keepSpecialComments:0,
                            rebase:false
                        }
                    }
                }]
            }
        }
    }
},
            
            usemin:{
                html:['dist/index.html','dist/Nosotros.html','dist/precios.html','dist/Reservar.html','dist/Terminos.html'],
                options:{
                    assetsDir:['dist','dist/css','dist/js']
                }
            }
});
grunt.registerTask('css',['sass']);
grunt.registerTask('default',['browserSync','watch']);
grunt.registerTask('img:compress',['imagemin']);
grunt.registerTask('build',['clean','copy','imagemin','useminPrepare','concat','cssmin','uglify','filerev','usemin'])

};