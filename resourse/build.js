/**
 * Created by Godfery on 2016/9/5 0005.
 */

function build() {
    let grunt = require('grunt');
    grunt = require('../Gruntfile')(grunt);

    grunt.tasks(['default'], {}, function() {
        grunt.log.ok('Done running tasks.');
        process.exit()
    });
}

module.exports = build;
