const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        port: 8090,
        disableHostCheck: false,
        progress: false,
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        hot: true,
        hotOnly: true,
    },
    module: {
        rules: [
            // 开发环境不需要将样式打包在一个css文件中
            // 同时为了方便 HMR 使用
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
