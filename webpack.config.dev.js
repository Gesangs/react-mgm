var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    entry: {
        'index': [
            './index'
        ]
    },
    output: {
        path: path.join(__dirname, ''),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new AssetsPlugin({
            filename: 'webpack-assets.js',
            processOutput: function (assets) {
                return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=react,presets[]=es2015',
        }, {
            test: /\.(css|less)$/,
            loader: 'style!css!postcss!less'
        }]
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};
