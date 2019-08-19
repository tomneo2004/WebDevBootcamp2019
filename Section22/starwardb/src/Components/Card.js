import React from "react";

const Card = (props) => {

	const {id, info} = props;

	return(

		<div className="tc bg-light-blue dib br3 ma2 grow bw2 shadow-5">
			<img alt="robot" src={`https://robohash.org/${id}?200x200`} />
			<h1>{info.name}</h1>
		</div>
	);
}

export default Card;