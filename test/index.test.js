const glob = require('glob');
const rsuiteCssBuild = require('../main');
const Path = require('path');
const distPath = 'dist/test';
const srcPath = 'lib';

const palette = (callback) => {
  console.log('palette');
  rsuiteCssBuild.palette({
    baseColor: '#1b9451',
    src: 'css/rsuite.min.css',
    dist: `${distPath}/rsuite-default.min.css`
  }, callback);
};

const importResources = (callback) => {
  console.log('importResources');
  rsuiteCssBuild.importResources({
    needDirPath: true,
    paths: [
      'fonts/**/*.*',
      'css/**/*'
    ],
    dist: distPath
  }, callback);
};

test('importResources && palette', (done) => {
  importResources(() => {
    palette(() => {
      const getFileNum = path => glob.sync(Path.join(__dirname, `../${path}/**/*`)).length
      expect(getFileNum(`${srcPath}/fonts`)).toBe(getFileNum(`${distPath}/fonts`));
      expect(getFileNum(`${srcPath}/css`)).toBe(getFileNum(`${distPath}/css`));
      done();
    })
  });
})

