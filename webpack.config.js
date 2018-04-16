const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { dependencies } = require('./package.json');

// Goes through all these npm modules and adds them to the vendor.js bundle instead of bundle.js
const VENDOR_LIBS = Object.keys(dependencies);

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'build'),
    // chunkhash is a unique string of characters used so the filename changes when the bundle is updated
    // if the filename changes then the browser will send retrieve and update the file, and not download from cache
    filename: '[name].[chunkhash].js' 
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // removes any common modules from vendor/bundle and only adds to vendor entry point
    new webpack.optimize.CommonsChunkPlugin({ 
      names: ['vendor', 'manifest'] // helps tell the browser whether or not vendor actually got changed
    }),
    // automatically adds script tag in html document for every bundle package we generate
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // DefinePlugin used to define window scoped variables defined within bundle.js files
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
