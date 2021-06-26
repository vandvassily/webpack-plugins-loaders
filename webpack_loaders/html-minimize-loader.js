// hmtl-optimize-loader.js
const Minimize = require("minimize");
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  var callback = this.async();
  this.cacheable && this.cacheable();

  var options = loaderUtils.getOptions(this) || {};
  var minimize = new Minimize(options);
  
  // 返回已压缩后的字符串
  return minimize.parse(source, callback);
};
