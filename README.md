#RSuite Theme

本主题基于[bootstrap](https://github.com/twbs/bootstrap)进行定制修改。主要特点：
> 1. 基于[HyperS](http://www.hypers.com)前端框架[pagurian](http://pagurian.com/design/)设计规范。并进行了大量改进优化。
> 2. 配置后一键生成主题样式
> 3. 增加各种动效
> 4. 支持ie9+、chrome、firefox等各种主流浏览器

## 预览
[http://rsuite.github.io/](http://rsuite.github.io/)

# 使用
## install
```bash
npm install rsuite-theme --save-dev
```
## api
### `importResources(options)` 导入资源
#### `options.path`  **必填**
需要导入的资源，支持正则匹配,如`fonts/**/*.*`,`css/*.css`等,资源列表详见目录结构
#### `options.dist` **必填**
输出目录,相对于运行使的脚本目录
### `palette(options)` 自定义输出
#### `options.baseColor` 输出的基色
默认为:`#00bcd4`
#### `options.src` 源文件
默认为:`css/rsuite.min.css`
#### `options.dist` **必填**
输出目录,相对于运行使的脚本目录

### Usage examples
```javascript
var rsuiteCssBuild = require('rsuite-theme');

rsuiteCssBuild.importResources({
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

//同时支持链式调用
//rsuiteCssBuild.importResources(options).palette(options);
```

## 开发
### 生成样式
```bash
$ npm install
$ grunt
```

### 生成Demo站点
```bash
$ grunt exampleSite
```

### 目录结构

```
Root
├── dist/                   //发布目录
│   ├── css/                //css
│   ├── fonts/              //字体
│   └── less/               //less源文件
└── docs //开发文档
```
