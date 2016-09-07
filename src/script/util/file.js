/**
 * Created by Godfery on 2016/8/8 0008.
 */
var request = require('superagent');
var path = require('path');
var util = require('util');
var http = require('http');
var fs = require('fs');
/**
 * 获取文件文本
 * @param filePath
 * @param call
 */
function getFileText(filePath, call) {
    if (isWebPath(filePath)) {
        request
            .get(filePath)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (util.isFunction(call)) {
                    call(res.text);
                }
            });
    }
}

/**
 * 获取文件数据
 * @param filePath
 * @param call
 */
function getFileData(filePath, call) {
    if (isWebPath(filePath)) {
        request.get(filePath).end(function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            if (util.isFunction(call)) {
                call(res.body);
            }
        });
    }
}

/**
 * 获取网络文件
 * @param filePath
 * @param call
 */
function getWebFile(filePath, call) {
    if (isWebPath(filePath)) {
        http.get(filePath, function(res) {
            if (util.isFunction(call)) {
                call(res);
            }
        });
    }
}

/**
 * 判断路径是否为http[s]请求
 * @param filePath
 * @returns {boolean}
 */
function isWebPath(filePath) {
    return /^https?\:\/\//i.test(filePath);
}

/**
 * 创建文件夹
 * @param dirpath - 文件路径
 * @param callback - 回调
 */
function mkdirs(dirpath, callback) {
    dirpath = path.normalize(dirpath);
    fs.exists(dirpath, (exists)=> {
        if (exists) {
            util.isFunction(callback) && callback(dirpath);
        } else {
            mkdirs(path.dirname(dirpath), ()=> {
                fs.mkdir(dirpath, callback);
            });
        }
    });
}

module.exports = {
    getFileText,
    getFileData,
    getWebFile,
    mkdirs
};
