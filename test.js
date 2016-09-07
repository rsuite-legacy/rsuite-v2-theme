/**
 * Created by Godfery on 2016/8/11 0011.
 */
var rsuiteCssBuild = require('./main');

rsuiteCssBuild.importResources({
    paths: [
        'fonts/**/*.*'
    ],
    dist: 'dist/test'
});
