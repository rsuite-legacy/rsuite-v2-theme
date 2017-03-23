# RSuite Theme
## 概述
本主题基于 [bootstrap](https://github.com/twbs/bootstrap) 进行定制修改。在统一不同使用场景的视觉和操作体验的同事，我们建立了完整的规范体系，便于创建项目也方便统一管理。以扁平化和简洁为主旨的设计风格，使用块面来进行布局，用线条来表达各个控件，使功能庞杂的系统 既直观又条理清晰，让使用者一目了然。选用清新的色彩为主基调，使界面清晰又不失沉稳。主要特点：
> 1. 遵循[HyperS](http://www.hypers.com)前端框架[pagurian](http://pagurian.com/design/)设计规范。并进行了大量改进优化。
> 2. 配置后一键生成主题样式，多种配置方式
> 3. 为主流浏览器提供动效，以大幅提升使用体验
> 4. 支持ie9+、chrome、firefox等各种主流浏览器
> 5. 提供开放的定制需求，包括但不仅限于色系、圆角、边框、阴影和组件的视觉定制。

## 预览
[http://rsuite.github.io/](http://rsuite.github.io/)

## 样式变量
`ruiste-theme`的样式使用[less](http://less.bootcss.com/) 作为开发语言，并定义了一系列全局 / 组件的样式变量，你可以根据需求进行相应调整。
- [默认样式变量](https://github.com/rsuite/rsuite-theme/blob/master/src/less/variables.less)

## 定制方式
### 1.cli工具使用
#### 安装
```bash
npm install rsuite-theme -g
```

#### 使用样例
在项目根目录下新建 `rsuite.config.js`

```javascript
const colors = {
    "default": "#00bcd4",
    "pagurian": "#1b9451"
};

module.exports = {
    "palette": [
        {
            colors,
            "output": "dist/test/css/"
        },
        {
            colors,
            "prev": "loading-",
            "output": "dist/test/css/",
            "src": "css/loading.min.css"
        }
    ],
    "resources": {
        paths: [
            'fonts/**/*.*'
        ],
        dist: 'dist/test'
    }
};
```
更多配置详见[配置项](#配置项)

在项目根目录下运行
```bash
rsuite-theme -I -P
```
#### 帮助

```bash
rsuite-theme -h
```

### 2. require方式使用
创建文件 `css-build.js`
```javascript
const build = require('rsuite-theme');
const outPutDir = 'resources/css';
const themes = {
                   "default": "#522e9b",
                   "blue": "#29a7e1",
                   "purple": "#9c27b0"
               };

build.importResources({
    paths: [
        'fonts/**/*.*'
    ],
    dist: outPutDir
});


Object.keys(themes).forEach((key)=>{
    build.palette({
            baseColor: themes[key],
            src: 'css/rsuite.min.css',
            dist: `${outPutDir}/rsuite-${key}.css`
        });
});
```
运行 `node` 脚本
```bash
node css-build.js
```

### 3.引用 less 文件
用 `less` 文件进行变量覆盖。
建立一个单独的 `less` 文件如下，再引入这个文件。
```less
@import "~rsuite-them/dist/less/rsuite";   // 引入官方提供的 less 样式入口文件
@import "custom-variables";   // 用于覆盖上面定义的变量
... //你自己的样式
```


## 配置项

### `options.resources` `{Object}` 导入资源

#### `options.resources.path`  **必填**
需要导入的资源，支持正则匹配,如`fonts/**/*.*`,`css/*.css`等,资源列表详见目录结构

#### `options.resources.dist` **必填**
输出目录,相对于运行使的脚本目录

### `options.palette` `{Array <palette>}` 按照主题色输出css文件  **必填**

### `palette` `{Object}` 

#### `palette.colors` `{Object}`  输出的基色的配置 **必填**
`<key>`:输出文件的文件名
`<value>`:输出文件的基色
每一个键值对对应一个css文件,如:`{'default':'#00bcd4'}`会输出一个名为`default.css`的文件，其基色为`#dddd`

#### `palette.src` 源文件
默认为:`css/rsuite.min.css`

#### `palette.dist` **必填**
输出目录,相对于运行使的脚本目录

### `prev` 输出文件的前缀名
输出文件为`<output>/<prev><colors.key>.css`的格式，如
```json
{
    "colors":{
        "default": "#00bcd4"
    },
    "prev": "loading-",
    "output": "dist/test/css/",
    "src": "css/loading.min.css"
}
```
输出文件为:
`dist/test/css/loading-default.css`

### 目录结构

```
Root
├── dist/                   //发布目录
│   ├── css/                //css
│   └── less/               //less源文件
│         └── fonts/              //字体文件
└── READNE.md //使用文档
```
