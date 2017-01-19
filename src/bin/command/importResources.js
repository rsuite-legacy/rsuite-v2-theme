/**
 * Created by Godfery on 2017/1/19.
 */
const info = require('../lib/info');
const {importResources} = require('../../main');
const Path = require('path');

exports.module = function (options) {
    const option = options.resources;
    if (!option) {
        info.fatal('resources is not defied in rsuite.config.js', 1);
    }
    return function () {
        importResources(option);
    };
};
