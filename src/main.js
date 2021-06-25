import { sum } from "./utils";
const a = 123;
const b = 321;
const add = require("./add.js");

const arr = [1, 2, 3];

arr.push(sum(a, b));
arr.push(add(3, 3));

arr.forEach((item) => {
  console.log(item);
});
