const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getAliases = require('./aliases');

const resolve = location => path.resolve(__dirname, location);
const publicPath = process.env.PUBLIC_PATH || '/';

module.exports = {
  target: 'web',

  entry: {
    index: resolve('../src/index.ts')
  },

  output: {
    path: resolve('../dist'),
    publicPath
  },

  resolve: {
    alias: getAliases(),
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      BASE_PATH: JSON.stringify(publicPath)
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/html/template.html'),
      minify: {
        collapseWhitespace: true
      },
      inject: false,
      chunks: ['index']
    })
  ]
};
