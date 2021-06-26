class BannerPlugin {
  constructor(options) {
    this.options = options;
  }
  // compiler 存放了打包的所有内容, webpack实例
  apply(compiler) {
    // emit当把打包的资源放到目标文件的时刻，是个异步钩子
    // complication这次打包的内容
    compiler.hooks.emit.tapAsync("BannerPlugin", (compilation, cb) => {
      const text = `/* ${this.options.banner} */ \n`;
      Object.keys(compilation.assets).forEach((item) => {
        let content = text + compilation.assets[item].source();
        compilation.assets[item] = {
          source: () => content,
          size: () => content.length,
        };
      });

      cb();
    });
  }
}

module.exports = BannerPlugin;
