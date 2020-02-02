const path = require('path');
const express = require('express');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./common.config.js');

const resolve = location => path.resolve(__dirname, location);
const publicPath = '/';

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: '[name].bundle.development.js',
    publicPath
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
          { loader: 'sass-loader', options: { prependData: `$basePath: "${publicPath}";` } }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      BASE_PATH: JSON.stringify(publicPath)
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/html/template.html'),
      inject: false,
      chunks: ['index']
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    public: 'localhost',
    publicPath: '/',
    historyApiFallback: true,
    before: function(app) {
      const assetsPath = resolve('../src/assets');
      app.use('/assets', express.static(assetsPath));
    }
  }
});
