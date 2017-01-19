/**
 * Created by Godfery on 2017/1/19.
 */
const {findUp} = require('./tool')
const pkg = require('../../package.json');

exports.helpHeader = function () {
    console.log(`${pkg.name}: ${pkg.description}@${pkg.version}`);
};

exports.helpFooter = function () {
    console.log(`If you're seeing this message, rsuite-theme hasn't been installed locally to
your project. For more information about installing and configuring rsuite-theme,
please see the Getting Started guide:

https://github.com/rsuite/rsuite-theme`);
};

// Show help, then exit with a message and error code.
exports.fatal = function (msg, code) {
    exports.helpHeader();
    console.log('Fatal error: ' + msg);
    console.log('');
    exports.helpFooter();
    process.exit(code);
};

// Show help and exit.
exports.help = function () {
    exports.helpHeader();
    exports.helpFooter();
    process.exit();
};
