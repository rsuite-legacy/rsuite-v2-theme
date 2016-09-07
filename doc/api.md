## node api
```javascript
var rsuiteCssBuild = require('./rsuite-theme');

rsuiteCssBuild.importResources({
    paths: [
        'fonts/**/*.*'
    ],
    dist: 'dist/test'
});

rsuiteCssBuild.palette({
    color:'#ff0000',                            //必填
    src:'rsuite-theme/src/rsuite-default.less', //选填参数，
    fontSize:'14px',                            //选填参数，
    fontFamily:'微软雅黑',                       //选填参数，
    dist:'/src/resources/rsuite-default.css'
});
```
