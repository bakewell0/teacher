var webpack = require('webpack');
module.exports = {
	entry: './jsx/dangpu.js',
	output: {
		filename: 'dangpu.js',
		path: __dirname + "/build"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	},
	plugins: [
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})*/
	]
};