const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 给css中的url增加前缀
                            publicPath: '../../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 给css中的url增加前缀
                            publicPath: '../../',
                        },
                    },
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        // webpack4.0 拆分css
        new MiniCssExtractPlugin({
            // css导出至 asset/css目录下
            filename: 'asset/css/[name].[contenthash:6].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
});
