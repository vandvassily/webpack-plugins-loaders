const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理构建目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyrightPlugin = require('../copyright')

const utils = require('./utils');
let entries = utils.getEntries('./src/pages');
let htmlPlugins = Object.keys(entries).map((value) => {
    return new HtmlWebpackPlugin({
        inject: 'body',
        template: `./src/pages/${value}/index.html`, // html模板名称
        filename: `${value}.html`, // 生成的页面名称
        chunks: [value], // 每个页面引入的js名称
    })
})

module.exports = {
    // JavaScript 执行入口文件
    entry: entries,
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'js/[name].[contenthash:8].js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2048,
                            outputPath: './asset/images',
                            name: '[name].[hash:6].[ext]',
                            // publicPath: './asset/images',
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader', // babel解析在.babelrc中配置
                },
            },
        ],
    },
    resolve: {},
    optimization: {
        runtimeChunk: {
            name: 'manifest',
        },
        chunkIds: 'natural',
        splitChunks: {
            chunks: 'all', // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
            minSize: 30000, // （默认值：30000）块的最小大小
            minChunks: 1, // （默认值：1）在拆分之前共享模块的最小块数
            maxAsyncRequests: 5, //（默认为5）按需加载时并行请求的最大数量
            maxInitialRequests: 5, //（默认值为3）入口点的最大并行请求数
            automaticNameDelimiter: '~', // 默认情况下，webpack将使用块的来源和名称生成名称，例如vendors~main.js
            cacheGroups: {
                // 以上条件都满足后会走入cacheGroups进一步进行优化的判断
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 判断引入库是否是node_modules里的
                    name(module, chunks, cacheGroupKey) {
                        // window和mac文件路径分隔符不一致，需要区分
                        const moduleFileName = module
                            .identifier()
                            .split(/[\\/]/)
                            .reduceRight((item) => item);
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: 'all',
                    // priority: -10,   // 数字越大优先级越高 （-10大于-20）
                    // name: 'vendors'  // 设置代码分割后的文件名
                },
                // default: {   //所有代码分割快都符合默认值，此时判断priority优先级
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true   // 允许在模块完全匹配时重用现有的块，而不是创建新的块。
                // }
            },
        },
    },
    plugins: [
        // 清空插件
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        ...htmlPlugins,
        new CopyrightPlugin()
    ],
    externals: {
        zepto: '$'
    },
    target: 'web',
};
