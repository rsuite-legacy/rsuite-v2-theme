const rsuiteCssBuild = require('../main');

const palette = () => {
  rsuiteCssBuild.palette({
    baseColor: '#1b9451',
    src: 'css/rsuite.min.css',
    dist: 'dist/test/css/rsuite.min.css'
  }, () => {
    console.log('Done');
  });
};

const importResources = (callback) => {
  rsuiteCssBuild.importResources({
    needDirPath: true,
    paths: [
      'fonts/**/*.*',
      'css/**/*'
    ],
    dist: 'dist/test'
  }, callback);
};

importResources(palette);
