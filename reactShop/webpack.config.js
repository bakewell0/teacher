var webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	entry:{
		dangpu: './jsx/dangpu.js',
    	order_list: './jsx/order_list.js'
	},
	output: {
		filename: '[name].js',
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