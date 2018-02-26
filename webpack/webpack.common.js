// const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  context: path.resolve(__dirname, '..'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
