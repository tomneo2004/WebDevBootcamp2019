import React from "react";
import "./SearchBox.css";


const SearchBox = (props)=>{

	const {onSearch} = props;
	return(

		<div>
			<input onChange={onSearch} className="tc ba bw2 b--dark-red h2" type="text" placeholder="Character name" />
		</div>
	);
}

export default SearchBox;