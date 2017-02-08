const webpack = require('webpack');
const path = require("path");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'index')
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.resolve(__dirname, "../assets/webpack"),
    filename: "[name].js"
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ENV: JSON.stringify(ENV)
      }
    })
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
