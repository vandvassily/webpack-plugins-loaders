import { sum } from "./utils";
const a = 123;
const b = 321;
const add = require("./add.js");
// 测试txt-loader
const txt = require("./name.txt");
// 测试html-minimize-loader
const html = require("./index.html");
console.log(txt);
console.log(html);

const arr = [1, 2, 3];

arr.push(sum(a, b));
arr.push(add(3, 3));

arr.forEach((item) => {
  console.log(item);
});
