/**
 * Created by Godfery on 2016/8/11 0011.
 */
var rsuiteCssBuild = require('./main');

rsuiteCssBuild.importResources({
    needDirPath: true,
    paths: [
        'fonts/**/*.*'
    ],
    dist: 'dist/test'
});

rsuiteCssBuild.palette({
    baseColor: '#1b9451',
    src: 'css/rsuite.min.css',
    dist: 'dist/test/css/rsuite.min.css'
});
