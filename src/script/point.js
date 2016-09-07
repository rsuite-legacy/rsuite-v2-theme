/**
 * Created by Godfery on 2016/9/5 0005.
 */

require('colors');
const Q = require('q');
const glob = require('glob');
const Path = require('path');
const util = require('util');
const fse = require('fs-extra');
const fs = require('fs');
const color = require('./util/color');
const {promisesResolve} = require('./util/common');

const rootPath = Path.join(__dirname, '../dist');
const originColor = '#00bcd4';

/**
 * 导入资源
 * @param {Object} options
 * @param {String []} paths
 * @param {String} dist
 */
function importResources({paths = [], dist = ''}={}) {
    try {
        if (dist.length === 0) {
            throw  'ERROR: [option.dist] is required';
        }
    } catch (e) {
        console.log(e.red);
    }
    console.log('importResources ...');
    let defferds = [];
    paths
        .map((path)=> {
            return Path.join(rootPath, path);
        })
        .forEach((path)=> {
            let defer = Q.defer();
            defferds.push(defer.promise);
            glob(path, {}, (err, files)=> {
                if (err) {
                    console.log(err);
                    defer.reject();
                    return;
                }
                defer.resolve(files);
            })
        });

    promisesResolve(defferds, (datas)=> {
        let copyDefferds = [];
        let allFilePaths = datas.reduce((previous, current)=> {
            previous.push(...current);
            return previous;
        }, []);

        allFilePaths.forEach((filePath)=> {
            let defer = Q.defer();
            copyDefferds.push(defer.promise);
            fse.copy(filePath, Path.join(dist, Path.relative(rootPath, filePath)), function(err) {
                if (err) {
                    return console.error(err);
                }
                defer.resolve();
            });
        });

        promisesResolve(copyDefferds, ()=> {
            console.log('importResources ' + '[SUCCESS]'.green);
        });
    });

    return module.exports;
};

/**
 * 画板方法
 * @param {Object} options
 */
function palette({baseColor = originColor, src = 'css/rsuite.min.css', dist}={}) {

    try {
        const requiredKey = ['src', 'dist'];
        requiredKey.forEach((key)=> {
            if (!arguments[0][key]) {
                throw  `ERROR: [option.${key}] is required`;
            }
        });
    } catch (e) {
        console.log(e.red);
        return;
    }

    const originColors = color.calcColors(originColor);
    const colors = color.calcColors(baseColor);
    const distPath = Path.dirname(dist);
    fse.ensureDir(distPath, (err)=> {
        if (err) console.log(err);
        fs.readFile(Path.join(rootPath, src), 'utf-8', (err, data)=> {
            originColors.forEach((color, index)=> {
                data = data.replace(new RegExp(color, 'g'), colors[index]);
            });
            fs.writeFile(dist, data, (err)=> {
                if (err) {
                    console.log("生成失败:" + err.red);
                    return;
                }
                console.log(`palette ${dist}` + '【成功】'.green);
            });
        });
    });

    return module.exports;
}

module.exports = {
    importResources,
    palette
};
