const glob = require('glob');
const Path = require('path');
const Fs = require('fs');
const rsuiteCssBuild = require('../main');

const distPath = 'dist/test';
const srcPath = 'lib';
const baseColor = '#1b9451';
const cssDistPath = `${distPath}/rsuite-default.min.css`;

const palette = (callback) => {
  rsuiteCssBuild.palette({
    baseColor,
    src: 'css/rsuite.min.css',
    dist: cssDistPath
  }, callback);
};

const importResources = (callback) => {
  rsuiteCssBuild.importResources({
    needDirPath: true,
    paths: [
      'fonts/**/*.*',
      'css/**/*'
    ],
    dist: distPath
  }, callback);
};

describe('RSUITE css build tools test:', () => {
  test('Importresources test.', (done) => {
    importResources(() => {
      const getFileNum = path => glob.sync(Path.join(__dirname, `../${path}/**/*`)).length;
      expect(getFileNum(`${srcPath}/fonts`)).toBe(getFileNum(`${distPath}/fonts`));
      expect(getFileNum(`${srcPath}/css`)).toBe(getFileNum(`${distPath}/css`));
      done();
    })
  });

  test('Palette test.', (done) => {
    palette(() => {
      expect(Fs.readFileSync(cssDistPath, 'utf-8').includes(baseColor)).toBe(true);
      done();
    })
  });
});

