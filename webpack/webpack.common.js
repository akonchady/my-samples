// const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  context: path.resolve(__dirname, '..'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public'),
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
};
