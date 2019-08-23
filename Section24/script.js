const c = require('./script2');

const a = c.largeNumber;
const b = 5;

console.log(a+b);

setTimeout(()=>{
	console.log(a+b+12);
}, 3000);

console.log(`Your dir is ${__dirname}`);