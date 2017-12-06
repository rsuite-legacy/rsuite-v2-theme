module.exports = function (grunt) {
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-csscomb');

  var path = require('path');
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
          {//用于webpack打包
            expand: true,
            cwd: `${__dirname}/src/less/fonts`,
            src: ['**/*'],
            dest: gruntConfig.output + '/less/fonts',
            flatten: false
          }, {//用于cdn托管
            expand: true,
            cwd: `${__dirname}/src/less/fonts`,
            src: ['**/*'],
            dest: gruntConfig.output + '/css/fonts',
            flatten: false
          }, {//用于命令中copy
            expand: true,
            cwd: `${__dirname}/src/less/fonts`,
            src: ['**/*'],
            dest: gruntConfig.output + '/fonts',
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
        compatibility: 'ie9',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      minifyCore: {
        files: {
          [gruntConfig.output + '/css/<%= pkg.name %>.min.css']: gruntConfig.output + '/css/<%= pkg.name %>.css'
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
 * @Base on:Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2016 hypers, Inc.
 * Licensed under MIT (https://github.com/rsuite/rsuite-theme/blob/master/LICENSE)
 */`
        },
        files: {
          [gruntConfig.output + '/css/<%= pkg.name %>.css']: 'src/less/rsuite.less'
        }
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

  grunt.initConfig(options);
  grunt.registerTask('defaultTask', task_default);
  grunt.registerTask('dev', task_dev);

  grunt.registerTask('default', 'Generate css & font', function () {
    pkg.name = 'rsuite';
    grunt.task.run('defaultTask');
    grunt.task.run('copy:dist');
  });

  return grunt;
}
