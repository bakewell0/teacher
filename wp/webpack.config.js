const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode:'production',
	entry: {
		pageOne: './src/index.js',
		pageTwo: './src/one.js'
	},
	output: {
		path: __dirname + '/dist/js',
		filename: '[name].js?ver=[hash]'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "../index.html",
			template:"index.html",
			chunks: ['pageOne']
		}),
		new HtmlWebpackPlugin({
			filename: "../pageTwo.html",
			template:"pageTwo.html",
			chunks: ['pageTwo']
		})
	]
};