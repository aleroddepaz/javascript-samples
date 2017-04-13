const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: '/assets/'
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({ 'React': 'react'})
  ]
};
