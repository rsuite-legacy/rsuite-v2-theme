module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-csscomb');

    var READ_JSON_CONFIG = {encoding: 'utf8'}
    var gruntConfig = grunt.file.readJSON('grunt/config.json', READ_JSON_CONFIG)

    var options = {
        pkg: grunt.file.readJSON("package.json", READ_JSON_CONFIG),
        clean: {
            //清除dist目录
            dist: [gruntConfig.output]
        },
        copy: {
            options: {
                paths: ['src']
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/fonts',
                    src: ['**/*'],
                    dest: gruntConfig.output + '/fonts',
                    flatten: false
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: gruntConfig.autoprefixerBrowsers
            },
            core: {
                options: {
                    map: true
                },
                src: gruntConfig.output + '/css/<%= pkg.name %>.css'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: [
                gruntConfig.output + '/css/<%= pkg.name %>.css'
            ]
        },
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            minifyCore: {
                src: gruntConfig.output + '/css/<%= pkg.name %>.css',
                dest: gruntConfig.output + '/css/<%= pkg.name %>.min.css'
            }
        },
        csscomb: {
            options: {
                config: '.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: gruntConfig.output + '/css/',
                src: ['*.css', '!*.min.css'],
                dest: gruntConfig.output + '/css/'
            }
        },
        less: {
            core: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: gruntConfig.output + '/css/<%= pkg.name %>.css.map'
                },
                src: 'src/less/suite.less',
                dest: gruntConfig.output + '/css/<%= pkg.name %>.css'
            }
        }
    }

    var task_default = ['clean', 'less:core', 'autoprefixer:core', 'csslint:dist', 'csscomb:dist', 'cssmin:minifyCore', 'copy:fonts'];

    grunt.initConfig(options);
    grunt.registerTask('default', task_default);
}
