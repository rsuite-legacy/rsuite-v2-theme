/**
 * Created by Godfery on 2016/8/11 0011.
 */
var rsuiteCssBuild = require('./main');
const outPutDir = 'dist/css';

rsuiteCssBuild.importResources({
    paths: [
        'fonts/**/*.*'
    ],
    dist: outPutDir
});

rsuiteCssBuild.palette({
    baseColor: '#6292f0',
    src: 'css/rsuite.min.css',
    dist: `${outPutDir}/rsuite.min.css`
});
