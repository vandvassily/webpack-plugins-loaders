const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");

// 清理构建目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyrightPlugin = require("./webpack_plugins/copyright");
const BannerPlugin = require("./webpack_plugins/banner");
const RemoveConsolePlugin = require("./webpack_plugins/removeConsole");

module.exports = {
  mode: "production",
  // JavaScript 执行入口文件
  entry: "./src/main.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "[name].[contenthash:8].js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader", // babel解析在.babelrc中配置
        },
      },
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, "webpack_loaders/txt-loader.js"),
          options: {
            name: package.author,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          "html-loader",
          {
            loader: path.resolve(
              __dirname,
              "webpack_loaders/html-minimize-loader.js"
            ),
            options: {
              comments: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {},
  plugins: [
    // 清空插件
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new BannerPlugin({
      banner: `this is a banner from ${package.author}`,
    }),
    new CopyrightPlugin({
      author: package.author,
    }),
    // new RemoveConsolePlugin(),
  ],
  externals: {
    zepto: "$",
  },
  target: ["web", "es6"],
};
