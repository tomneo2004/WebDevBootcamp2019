import React,{Component} from "react";


const Rank = ({name, rank})=>{

	return(

		<div>
			<div className="tc white f3">
				{`${name}, your current rank is`}
			</div>
			<div className="tc white f1">
				{`#${rank}`}
			</div>
		</div>
	);
}

export default Rank;