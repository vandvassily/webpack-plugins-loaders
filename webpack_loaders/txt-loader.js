// txt-loader.js
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  this.cacheable && this.cacheable();
  const options = loaderUtils.getOptions(this) || {};

  source = source.replace(/\[name\]/g, options.name);

  // 最后一个loader需要转为node commonJS模块
  return `module.exports = '${JSON.stringify(source)}'`;
};
