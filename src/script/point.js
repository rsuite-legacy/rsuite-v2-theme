/**
 * Created by Godfery on 2016/9/5 0005.
 */

require('colors');
const Q = require('q');
//const less = require('less');
const glob = require('glob');
const Path = require('path');
const util = require('util');
const fse = require('fs-extra');
const {promisesResolve} = require('./util/common');

const rootPath = Path.join(__dirname, '../dist');

/**
 * 导入资源
 * @param paths
 * @returns {Block}
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
    paths = paths
        .map((path)=> {
            return Path.join(rootPath, path);
        });
    paths.forEach((path)=> {
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
};

module.exports = {
    importResources
};
