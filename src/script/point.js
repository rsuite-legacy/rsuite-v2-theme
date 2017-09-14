/**
 * Created by Godfery on 2016/9/5 0005.
 */

require('colors');
const Q = require('q');
const glob = require('glob');
const Path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const color = require('./util/color');
const { promisesResolve } = require('./util/common');

const async = require('async');

const rootPath = Path.join(__dirname, '../dist');
const originColor = '#00bcd4';

/**
 * 导入资源
 * @param {Object} options
 * @param {String []} paths
 * @param {String} dist
 */
function importResources({ paths = [], dist = '', needDirPath = true } = {}, doneCallback) {
    try {
        if (dist.length === 0) {
            throw  'ERROR: [option.dist] is required';
        }
    } catch (e) {
        console.log(e.red);
    }
    console.log('ImportResources ...');
    /**
     * 获取全部文件的路径
     * @param paths
     * @param callback
     */
    const getPathsAllFiles = (paths, callback) => {
        let allFiles = [];
        const absolutePaths = paths.map(path => Path.join(rootPath, path));
        async.eachLimit(absolutePaths, 1, (path, next) => {
            glob(path, {}, (err, files) => {
                if (err) {
                    console.log(err);
                } else {
                    allFiles = [...allFiles, ...files];
                }
                next();
            })
        }, () => callback && callback(allFiles));
    }

    /**
     * 复制文件
     * @param files
     * @param callback
     */
    const copyFiles = (files, callback) => {
        async.eachLimit(files, 1, (filePath, next) => {
            const outputPath = needDirPath ? Path.relative(rootPath, filePath) : Path.basename(filePath);
            console.log(`Copy ${outputPath}`);
            fse.copy(filePath, Path.join(dist, outputPath), function (err) {
                if (err) {
                    console.error(err);
                }
                next();
            });
        }, () => {
            callback && callback();
            doneCallback && doneCallback();
        });
    }

    getPathsAllFiles(paths, file => copyFiles(file, () => {
        console.log('ImportResources ' + '[SUCCESS]'.green);
    }));

    return module.exports;
};

/**
 * 画板方法
 * @param {Object} options
 */
function palette({ baseColor = originColor, src = 'css/rsuite.min.css', dist } = {}) {

    try {
        if (!dist) {
            throw  `ERROR: [option.${key}] is required`;
        }
    } catch (e) {
        console.log(e.red);
        return;
    }

    const originColors = color.calcColors(originColor);
    const colors = color.calcColors(baseColor);
    const distPath = Path.dirname(dist);
    fse.ensureDir(distPath, (err) => {
        if (err) console.log(err);
        fs.readFile(Path.join(rootPath, src), 'utf-8', (err, data) => {
            originColors.forEach((color, index) => {
                data = data.replace(new RegExp(color, 'g'), colors[index]);
            });
            fs.writeFile(dist, data, (err) => {
                if (err) {
                    console.log("Failed :" + err.red);
                    return;
                }
                console.log(`Palette ${dist}` + '[SUCCESS]'.green);
            });
        });
    });

    return module.exports;
}

module.exports = {
    importResources,
    palette
};
