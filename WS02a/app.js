console.log("Hello, Node.js!");

const math = require("./math");
const stringUtils = require("./stringUtils");
const dateUtils = require("./dateUtils");

console.log("Addition:", math.add(5, 3));
console.log("Subtraction:", math.subtract(10, 4));

console.log("Uppercase:", stringUtils.toUpperCase("hello"));
console.log("Reversed:", stringUtils.reverseString("world"));

console.log("Current Date:", dateUtils.getCurrentDate());
console.log("Formatted Date:", dateUtils.formatDate(new Date()));
