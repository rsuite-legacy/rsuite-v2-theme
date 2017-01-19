/**
 * Created by Godfery on 2017/1/19.
 */
const Path = require('path');
const basedir = process.cwd();
const util = require('util');

/**
 * 引入json文件
 * @param path
 */
exports.requireJson = function (filename) {
    return JSON.parse(require('fs').readFileSync(Path.join(basedir, filename), 'utf8'));
}

/**
 * 在项目根目录找文件
 * @param filename
 * @return {*}
 */
exports.findUp = function (filename) {
    const basedir = process.cwd();
    return require(Path.join(basedir, filename));
}

exports.isArray = util.isArray;
