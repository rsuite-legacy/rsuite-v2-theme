/**
 * Created by Godfery on 2017/3/13.
 */
const fs = require('fs');
const Path = require('path');
const rootPath = Path.join(__dirname, '../dist');
fs.readFile(Path.join(rootPath, 'css/style.css'), 'utf-8', (err, data) => {
    const reg = /(?:\.)(.*)(?:\:before \{)/g;
    const classNames = data.match(reg).map((className) => {
        return className.match(/(?:\.)(.*)(?:\:before \{)/)[1];
    });
    let Str = classNames.map((className) => {
        className = className.replace(/^icon\-/, '');
        return `"${className}"`;
    }).sort((a,b)=>a.localeCompare(b));
    Str = Array.from(new Set(Str)).join(',');
    fs.writeFile(Path.join(__dirname, 'test.js'), `[${Str}]`, function (err) {
        console.log(err);
    })
});
