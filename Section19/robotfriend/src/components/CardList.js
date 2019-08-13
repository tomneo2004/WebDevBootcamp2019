import React from "react";
import Card from "./Card";

const CardList = ({robots})=>{

	const cardComponent = robots.map((robot, i)=>{
		return <Card key={i} id={robot.id} name={robot.name} email={robot.email}/>
	});

	//Same as above
	// const cardFun = ()=>{
	// 	let cards = [];

	// 	robots.forEach((robot)=>{
	// 		cards.push(<Card key={robot.id} id={robot.id} name={robot.name} email={robot.email}/>);
	// 	});

	// 	return cards;
	// }

	return(

		<div>
			
			{cardComponent}

			{
				// robots.map((robot, i)=>{
				// 	return <Card key={i} id={robot.id} name={robot.name} email={robot.email}/>
				// });
			}

		</div>
	);
}

export default CardList;