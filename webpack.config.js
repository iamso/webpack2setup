var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

var entry = PRODUCTION
	?	['./src/js/main.js']
	:	[
			'./src/js/main.js',
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080'
		];

var plugins = PRODUCTION
	?	[
			new webpack.optimize.UglifyJsPlugin(),
			new ExtractTextPlugin('style-[contenthash:10].css'),
			new HTMLWebpackPlugin({
				template: 'index-template.html'
			})
		]
	:	[
			new webpack.HotModuleReplacementPlugin()
		];

plugins.push(
	new webpack.DefinePlugin({
		PRODUCTION: JSON.stringify(PRODUCTION),
		DEVELOPMENT: JSON.stringify(DEVELOPMENT)
	})
);

const scssIdentifier = PRODUCTION ? '[hash:base24:10]' : '[path][name]---[local]';
const scssLoader = PRODUCTION
	? 	ExtractTextPlugin.extract({
			loader: 'css-loader!sass-loader?localIdentName=' + scssIdentifier
		})
	:	['style-loader', 'css-loader', 'sass-loader?localIdentName=' + scssIdentifier];

module.exports = {
	externals: {
		'jquery': 'jQuery'
	},
	devtool: PRODUCTION ? 'source-map' : null,
	entry: entry,
	plugins: plugins,
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: '/node_modules/'
		},
		{
			test: /\.(png|jpg|gif)$/,
			loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
			exclude: '/node_modules/'
		},
		{
			test: /\.scss$/,
			loaders: scssLoader,
			exclude: '/node_modules/'
		}]
	},
	output: {
		path: __dirname + '/dist',
		publicPath: PRODUCTION ? '/' : '/dist/',
		filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
	}
};