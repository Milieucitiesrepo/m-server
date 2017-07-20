const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  devtool: "eval",
  entry: {
    bundle: path.join(__dirname, "index.js")
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: 'http://0.0.0.0:8080/',
    chunkFilename: "[name].js"
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "client"),
      manifest: require("./dll/vendor-manifest.json")
    }),
    new ExtractTextPlugin('[name].css'),
    // new webpack.DefinePlugin({ // <-- key to reducing React's size
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: [
            path.join(__dirname, "client") //important for performance!
        ],
        query: {
            cacheDirectory: true, //important for performance
            plugins: ["transform-regenerator"],
            presets: ["react", "es2015", "stage-0"]
        }
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
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: path.resolve(__dirname, "client"),
    modulesDirectories: ["node_modules"]
  },

  postcss: [autoprefixer],

  sassResources: ['../assets/stylesheets/variables.scss']
}
