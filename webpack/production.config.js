const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./common.config.js');

const resolve = location => path.resolve(__dirname, location);
const publicPath = process.env.PUBLIC_PATH || '/';

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].bundle.production.js'
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
          { loader: MiniCssExtractPlugin.loader },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      BASE_PATH: JSON.stringify(publicPath)
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('../src/assets'),
        to: resolve('../dist/assets')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: resolve('../src/html/template.html'),
      minify: {
        collapseWhitespace: true
      },
      inject: false,
      chunks: ['index']
    }),
    new HTMLInlineCSSWebpackPlugin({
      filter: fileName => fileName.includes('base')
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [resolve('../dist/base.bundle.production.js')]
    })
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new OptimizeCSSAssetsPlugin({})]
  }
});
