/**
 * Created by Godfery on 2016/9/7 0007.
 */
const util = require('util');
const Q = require('q');
/**
 * 实现类似$.when()的功能
 * @param {q.defer.promise []} promises
 * @param call
 */
function promisesResolve(promises = [], call) {
    let datas = [];
    const defer = Q.defer();
    defer.resolve([]);
    promises.reduce((previous, current, index)=> {
        return previous.then((resp)=> {
            datas.push(resp);
            return current;
        });
    }, defer.promise).then((resp)=> {
        datas.push(resp);
        if (util.isFunction(call)) {
            call(datas);
        }
    });
}

module.exports = {
    promisesResolve
}
