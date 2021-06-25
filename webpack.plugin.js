const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");
// 清理构建目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyrightPlugin = require("./webpack_plugins/copyright");
const RemoveConsolePlugin = require("./webpack_plugins/removeConsole");

module.exports = {
  mode: "development",
//   mode: "production",
  // JavaScript 执行入口文件
  entry: "./webpack_plugins/copyright.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "copyright.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist"),
    library: 'copyright',
    libraryTarget: "umd",
  },
  module: {
    rules: [
      //   {
      //     test: /\.m?js$/,
      //     use: {
      //       loader: "babel-loader", // babel解析在.babelrc中配置
      //     },
      //   },
    ],
  },
  resolve: {},
  plugins: [
    // 清空插件
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyrightPlugin({
      author: package.author,
    }),
  ],
};
