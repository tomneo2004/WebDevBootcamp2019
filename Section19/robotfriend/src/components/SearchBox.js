import React from "react";

const searchBox = ({searchField})=>{

	return (

		<div className="pa2">
			<input onChange={searchField} className="pa3 ba b--green bg-light-blue" type="search" placeholder="Search robot" />
		</div>
		
	);
}

export default searchBox;