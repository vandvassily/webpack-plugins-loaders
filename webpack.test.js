module.exports = {
  mode: "production",
  entry: "./add.js",
  output: {
    filename: "./dist/add.js",
    // export to AMD, CommonJS, or window
    libraryTarget: "umd",
    // the name exported to window
    library: "add",
  },
};
