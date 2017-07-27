const webpack = require('webpack');
const path = require("path");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  cache: true,
  devtool: "eval",
  entry: {
    bundle: path.resolve(__dirname, 'index')
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js',
    publicPath: '/assets'
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
    }),
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
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
        test: /\.less$/,
        loaders: ['style-loader',
        'css-loader',
        'less-loader']
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
