export const searchCharacter = async (keyword) => {

	let url = "https://swapi.co/api/";
	let result = []

	if(keyword === ""){
		url = url+"people/";
	}
	else{
		url = url+keyword;
	}

	try{

		let res = await fetch(url);
		let data = await res.json();
		result = result.concat(data.results);
		while(data.next){
			res = await fetch(data.next);
			data = await res.json();
			result = result.concat(data.results);
		}

		return result;
	}
	catch(err){
		console.log(err);
		return err;
	}
	
}