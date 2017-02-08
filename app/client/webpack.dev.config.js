const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    bundle: path.resolve(__dirname, 'index')
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://0.0.0.0:8080/',
    filename: '[name].js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&plugins[]=lodash'
      },
      {
        test: /\.(json|geojson)$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style',
        'css?modules&importLoaders=3&localIdentName=[name]-[local]-[hash:base64:5]',
        'sass',
        'sass-resources']
      },
      {
        test: /\.css$/,
        loaders: ['style',
        'css?modules&importLoaders=3&localIdentName=[name]-[local]-[hash:base64:5]']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=100000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url'
      }
    ]
  },

  postcss: [autoprefixer],

  sassResources: ['../assets/stylesheets/variables.scss']
}
