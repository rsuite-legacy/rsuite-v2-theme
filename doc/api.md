## node api
```javascript
rsuite.importResources([
    'lib/fonts/*',
    'lib/images/*',
    'js/default.js',
    'css/myTheme.css'
    //...
]).dist('/src/resources')


rsuite.palette({
    color:'#ff0000',                            //必填
    src:'rsuite-theme/src/rsuite-default.less', //选填参数，
    fontSize:'14px',                            //选填参数，
    fontFamily:'微软雅黑',                       //选填参数，
    //...
}).dist('/src/resources/rsuite-default.css');
```
