const path = require('path');
const getAliases = require('./aliases');

const resolve = location => path.resolve(__dirname, location);

module.exports = {
  target: 'web',

  entry: {
    index: resolve('../src/index.ts'),
    base: path.resolve(__dirname, '../src/app/styles/base.scss')
  },

  output: {
    path: resolve('../dist')
  },

  resolve: {
    alias: getAliases(),
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
  }
};
