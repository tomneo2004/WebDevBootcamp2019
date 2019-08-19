import React from "react";
import Card from "./Card";

const renderCards = (characters)=>{
	
	if(characters.length > 0){


		return characters.map((cha, i)=>{

			return <Card key={i} id={i} info={cha} />
		})

	}
	else{

		return <h1>Loading...</h1>
	}
}

const CardList = (props)=>{


	const {characters} = props;

	return(

		<div>
			{renderCards(characters)}
		</div>
	);
}

export default CardList;