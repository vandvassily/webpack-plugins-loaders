class CopyrightWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  // compiler 存放了打包的所有内容, webpack实例
  apply(compiler) {
    // emit当把打包的资源放到目标文件的时刻，是个异步钩子
    // complication这次打包的内容
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        const text = `/* copyright by ${this.options.author} */ \n`;
        Object.keys(compilation.assets).forEach((item) => {
          let content = text + compilation.assets[item].source();
          compilation.assets[item] = {
            source: () => content,
            size: () => content.length,
          };
        });
        compilation.assets["copyright.txt"] = {
          source: function () {
            return text;
          },
          size: function () {
            return text.length;
          },
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
