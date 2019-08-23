const fs = require('fs');

fs.readFile('./puzzle1.txt', (err, data)=>{

	
	if(err){
		console.log('reading puzzle1.txt fail '+err);
		return;
	}

	//find floor solution 1
	console.time('Find-floor S1');
	const dirs = data.toString();
	const dirArr = dirs.split('');
	const arr = dirArr.reduce((acc, value)=>{
		if(value==='(')
		{
			return acc+=1;
		}
		else{
			return acc-=1;
		}
		
	}, 0)
	console.timeEnd('Find-floor S1');

	//find floor solution 2
	console.time('Find-floor S2');
	const str = data.toString();
	const strl = str.length;
	const upCount = str.split('(').length-1;
	const downCount = strl - upCount;
	const result = upCount - downCount;
	console.timeEnd('Find-floor S2');

	//find floor answer
	console.log('Find-floor answer: '+result);


	//enter basement solution 1
	console.time('Enter-basement S1');
	const rStr = data.toString();
	const rStrArr = rStr.split('');
	let rAcc = 0;
	let rCounter = 0;
	rStrArr.some((value)=>{

		if(value==='(')
		{
			rAcc+=1;
		}
		else{
			rAcc-=1;
		}

		rCounter++;

		return rAcc<0;

	})
	
	console.timeEnd('Enter-basement S1');

	//enter basement solution 2
	console.time('Enter-basement S2');
	const bStr = data.toString();
	let acc = 0;
	let counter = 0;
	
	for(let i=0; i<bStr.length; i++){
		if(bStr[i] === '(')
			acc+=1;
		else
			acc-=1;
		counter++;
		if(acc<0)
			break;

	}
	console.timeEnd('Enter-basement S2');

	//enter basement answer
	console.log('Enter-basement answer: '+counter);

	
})