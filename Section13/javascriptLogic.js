//Question1
const array = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];

function cleanRoom(arr){

	let sortArr = qSort(arr,0,arr.length-1);

	let newArr = [];
	let rangeStart = 0;
	let rangeEnd = rangeStart;

	//organize array
	while(rangeStart < sortArr.length){
		//find end range index
		while(rangeEnd < sortArr.length && 
			sortArr[rangeEnd] === sortArr[rangeEnd+1]){

			rangeEnd++;
		}

		//extract array or element from rangeStart to rangeEnd
		const extract = sortArr.slice(rangeStart, rangeEnd+1);
		newArr.push(extract.length > 1 ? extract : extract[0]);
		
		rangeStart = rangeEnd+1;
		rangeEnd = rangeStart;
	}

	return newArr;
}

//QuickSort algorithm
function qSort(arr, l, r){

	// base case if left greater or equal to right
	// do not sort if base case reach
	if (l>=r){
		return
	}

	// pivot index
	let pivot = l;
	// left incremental index
	let l_index = l+1;
	// right decremental index
	let r_index = r;

	//sorting and partition
	while(l_index<r_index){

		//find left index which value is smaller than value of pivot index
		while(l_index<=r_index && arr[l_index] < arr[pivot]){
			l_index++;
		}

		//find right index which value is greater than value of pivot index
		while(r_index>=l_index && arr[r_index] > arr[pivot]){
			r_index--;
		}

		//swap value of left index and right index
		if(l_index<r_index){
			let temp = arr[l_index];
			arr[l_index] = arr[r_index];
			arr[r_index] = temp;
			l_index++;
			r_index--;
		}
	}

	//swap value of pivot index with value of right index if needed
	if(arr[r_index] < arr[pivot]){
		let temp = arr[pivot];
		arr[pivot] = arr[r_index];
		arr[r_index] = temp;
	}
	
	//sort left side
	qSort(arr, l, r_index-1);
	//sort riht side
	qSort(arr, l_index, r);

	return arr;
	
}


//Question2
const array2 = [1,2,3];

function answer(arr, target){

	decrementTarget = target-1;

	while(decrementTarget > 0){

		let mod = target % decrementTarget;

		if(mod > 0){
			let compared = [decrementTarget, mod];
			let newArr = arr.reduce((acc, num)=>{
				
				if(compared.includes(num) && !acc.includes(num)){
					acc.push(num);
				}

				return acc;

			}, []);

			if(newArr.length == 2){
				return newArr;
			}
		}

		decrementTarget--;
	}

	return [];
}

//Question3
function componentToHex(c){
	let h = Number(c).toString(16);
	h = h.length > 1? h : "0"+h;
	return h;
}

function componentToRGB(c){
	let value = parseInt(c, 16);
	return String(value);
}

function rgbToHex(rgb){
	let rgbArr = rgb.split(",");
	if(rgbArr.length != 3){
		console.log("rgb invalid format");
		return "";
	}

	let r = componentToHex(Number(rgbArr[0]));
	let g = componentToHex(Number(rgbArr[1]));
	let b = componentToHex(Number(rgbArr[2]));

	return "#"+r+g+b;
}

function hexToRGB(hex){
	if(hex.length != 6){
		console.log("hex invalid format");
		return "";
	}

	let hexR = hex.slice(0,2);
	let hexG = hex.slice(2,4);
	let hexB = hex.slice(4,6);

	let r = componentToRGB(hexR);
	let g = componentToRGB(hexG);
	let b = componentToRGB(hexB);

	return r+","+g+","+b;
}

function colorConverter(color){

	let rgb = color.split(",");
	if(rgb.length == 3){

		return rgbToHex(color);
	}

	let hex = color.split("#");
	if(hex.length === 2 && hex[1].length === 6){

		return hexToRGB(hex[1]);
	}

	console.log("Invalid format, formatRGB: r,g,b formatHex:#58693f");
	return "";
}