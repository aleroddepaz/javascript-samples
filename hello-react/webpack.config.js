const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: '/'
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
    new webpack.ProvidePlugin({ 'React': 'react'}),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
