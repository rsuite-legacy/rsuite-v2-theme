/**
 * Created by Godfery on 2017/1/19.
 */
const info = require('../lib/info');
const {palette} = require('../../main');
const Path = require('path');

exports.module = function (options) {
    const option = options.palette;
    if (!option) {
        info.fatal('palette is not defied in rsuite.config.js', 1);
    }

    return function () {
        option.forEach((config) => convertConfig(config).forEach(palette));
    };
};

/**
 * 转换配置为标准option
 * @param config
 * @return {Array}
 */
function convertConfig(config) {
    let {colors, prev = '', output, src} =config;
    return Object.keys(colors).map(key => {
        return {
            baseColor: colors[key],
            src,
            dist: Path.join(output, `${prev}${key}${Path.extname(src)}`)
        }
    });
}
