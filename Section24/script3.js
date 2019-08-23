const fs = require('fs');

fs.readFile('./hello.txt', (err, data)=>{
	if(err){
		console.log("Error");
		return;
	}

	console.log('async '+data.toString('utf8'));
})

const data = fs.readFileSync('./hello.txt');
console.log('sync '+data.toString('utf8'));

fs.appendFile('./hello.txt', 'text append!!!', err=>{
	if(err){
		console.log(err);
	}
})

// fs.writeFile('./temp.txt', 'abc', err=>{
// 	if(err){
// 		console.log(err);
// 	}
// })

fs.unlink('./temp.txt', err=>{
	if(err){
		console.log(err);
	}
})