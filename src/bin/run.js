/**
 * Created by Godfery on 2017/1/19.
 */
const program = require('commander');
const Path = require('path');
const {findUp} = require('./lib/tool');
const info = require('./lib/info');
const {palette, importResources} = require('./command/index');
const pkg = findUp('package.json');
let config;

try {
    config = findUp('rsuite.config.js');
} catch (e) {
    info.help();
}

program
    .version(pkg.version)
    .option('-P, --palette', 'generate the css file', palette(config), null)
    .option('-I, --importResources', 'import the resource file', importResources(config), null)
    .parse(process.argv);
