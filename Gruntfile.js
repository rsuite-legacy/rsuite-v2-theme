module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-compile-handlebars');

    var path = require('path');
    var pallet = require('./grunt/pallet');
    var READ_JSON_CONFIG = { encoding: 'utf8' };
    var gruntConfig = grunt.file.readJSON('grunt/config.json', READ_JSON_CONFIG);
    var pkg = grunt.file.readJSON("package.json", READ_JSON_CONFIG);

    gruntConfig.output = path.join(__dirname, gruntConfig.output);
    var options = {
        pkg: pkg,
        clean: {
            //清除dist目录
            dist: [gruntConfig.output]
        },
        copy: {
            options: {
                paths: ['src']
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: `${__dirname}/src/fonts`,
                        src: ['**/*'],
                        dest: gruntConfig.output + '/less/fonts',
                        flatten: false
                    }, {
                        expand: true,
                        cwd: `${__dirname}/src/fonts`,
                        src: ['**/*'],
                        dest: gruntConfig.output + '/css/fonts',
                        flatten: false
                    }
                ]
            },
            exampleResource: {
                files: [
                    {
                        expand: true,
                        cwd: `${__dirname}/src/example`,
                        src: ['**/*', '!fixtures', '!data', '!**/*.json', '!**/*.handlebars', '!**/*.hbs'],
                        dest: gruntConfig.output + '/examples',
                        flatten: false
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: `${__dirname}/src`,
                        src: [
                            '**/*',
                            '!example',
                            '!example/**/*',
                            '!script',
                            '!script/**/*',
                            '!fonts',
                            '!fonts/**/*',
                            '!bin',
                            '!bin/**/*'
                        ],
                        dest: gruntConfig.output,
                        flatten: false
                    }
                ]
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
                files: {
                    [gruntConfig.output + '/css/<%= pkg.name %>.min.css']: gruntConfig.output + '/css/<%= pkg.name %>.css',
                    [gruntConfig.output + '/css/loading.min.css']: gruntConfig.output + '/css/loading.css',
                }
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
                    sourceMapFilename: gruntConfig.output + '/css/<%= pkg.name %>.css.map',
                    banner: `@charset "utf-8";/*!
 * @Name:${pkg.name}@${pkg.version}
 * @Author: ${pkg.author.map((author) => `[${author.name}](${author.email})`)}
 * @Base on:Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2016 hypers, Inc.
 * Licensed under MIT (https://github.com/rsuite/rsuite-theme/blob/master/LICENSE)
 */`
                },
                files: {
                    [gruntConfig.output + '/css/<%= pkg.name %>.css']: 'src/less/rsuite.less',
                    [gruntConfig.output + '/css/loading.css']: 'src/less/loading.less'
                }
            }
        },
        'compile-handlebars': {
            example: {
                partials: ['src/example/fixtures/**/*.handlebars', 'src/example/base.handlebars'],
                files: [
                    {
                        expand: true,
                        cwd: `${__dirname}/src/example/`,
                        src: ['*.handlebars', '!base.handlebars'],
                        dest: gruntConfig.output + '/examples/',
                        ext: '.html'
                    }
                ],
                templateData: `${__dirname}/src/example/data/index.json`
            }
        }
    }

    var task_default = [
        'clean:dist',
        'less:core',
        'autoprefixer:core',
        'csslint:dist',
        'csscomb:dist',
        'cssmin:minifyCore',
        'copy:fonts'
    ];
    var task_dev = ['clean:dist', 'less:core', 'autoprefixer:core', 'csscomb:dist', 'cssmin:minifyCore', 'copy:fonts'];
    var task_examples = ['compile-handlebars:example'];

    grunt.initConfig(options);
    grunt.registerTask('defaultTask', task_default);
    grunt.registerTask('dev', task_dev);

    grunt.registerTask('default', 'Generate css & font', function () {
        pkg.name = 'rsuite';
        grunt.task.run('defaultTask');
        grunt.task.run('copy:dist');
    });

    grunt.registerTask('exampleSite', 'Generate Example Site', function () {
        grunt.log.writeln('Site generating...');
        grunt.task.run('copy:exampleResource');
        grunt.task.run('compile-handlebars:example');
    });

    return grunt;
}
