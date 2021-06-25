class RemoveConsoleQPlugin {
  constructor(options) {
    this.options = options;
  }
  // compiler 存放了打包的所有内容, webpack实例
  apply(compiler) {
    // emit当把打包的资源放到目标文件的时刻，是个异步钩子
    // complication这次打包的内容
    compiler.hooks.emit.tapAsync("RemoveConsoleQPlugin", (compilation, cb) => {
      const reg = new RegExp(/console\.log\(\w+\)\;*/);
      
      Object.keys(compilation.assets).forEach((item) => {
        let content = compilation.assets[item].source();
        content = content.replace(reg, "");
        compilation.assets[item] = {
          source: () => content,
          size: () => content.length,
        };
      });
      cb();
    });
  }
}

module.exports = RemoveConsoleQPlugin;
