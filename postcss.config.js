const { NODE_ENV } = process.env;
const __DEBUG__ = NODE_ENV === 'development';

const plugins = [
  require('autoprefixer'),
  require('cssnano')({
    preset: [
      'default', {
        discardComments: {
          removeAll: !__DEBUG__
        }
      }
    ]
  })
];

module.exports = {
  plugins
};
