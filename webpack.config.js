var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

var entry = PRODUCTION
  ? ['./src/js/main.js']
  : [
      './src/js/main.js',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:4321'
    ];

var plugins = PRODUCTION
  ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          drop_console: true
        },
        preserveComments: false
      }),
      new ExtractTextPlugin('style-[contenthash:10].min.css'),
      new HTMLWebpackPlugin({
        template: 'index-template.html'
      })
    ]
  : [
      new webpack.HotModuleReplacementPlugin()
    ];

plugins.push(
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(PRODUCTION),
    DEVELOPMENT: JSON.stringify(DEVELOPMENT)
  })
);

const scssIdentifier = PRODUCTION ? '[hash:base24:10]' : '[path][name]---[local]';

// Loaders are read from right to left
const cssLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
      use: ['css-loader?minimize&importLoaders=1', 'postcss-loader']
    })
  : ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'];

module.exports = {
  externals: {
    'jquery': 'jQuery'
  },
  devtool: DEVELOPMENT ? 'source-map' : false,
  entry: entry,
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: "eslint-loader"
      },
      {
        test: /\.modernizrrc.js$/,
        use: 'modernizr-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules\/lodash/
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        // use: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
        use: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: cssLoader,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: __dirname + '/.modernizrrc.js',
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: PRODUCTION ? '/' : '/dist/',
    filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
  }
};