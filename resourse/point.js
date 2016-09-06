/**
 * Created by Godfery on 2016/9/5 0005.
 */

//const Block = require('./Block');
const Q = require('q');
//const less = require('less');
const glob = require('glob');
const Path = require('path');
const util = require('util');
const fse = require('fs-extra');

const rootPath = Path.join(__dirname, '../src/');
console.log(rootPath);

/**
 * 导入资源
 * @param paths
 * @returns {Block}
 */
function importResources(paths = []) {
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
        let allfiles = datas.reduce((previous, current)=> {
            previous.push(...current);
            return previous;
        }, []);
        console.log(allfiles);
    });
}

/**
 *
 * @param {q.defer.promise []} promises
 * @param call
 */
function promisesResolve(promises, call) {
    let datas = [];
    promises.reduce((previous, current, index)=> {
        return previous.then((resp)=> {
            datas.push(resp);
            return current;
        });
    }).then((resp)=> {
        datas.push(resp);
        if (util.isFunction(call)) {
            call(datas);
        }
    });
}

module.exports = {
    importResources
};
