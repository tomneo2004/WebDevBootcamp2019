import React, {Component} from "react";

class Timer extends Component{

	constructor(){
		super();

		this.state={
			counter: 0
		}

		setInterval(this.tick, 1000);
	}

	tick = ()=>{

		this.setState({counter:this.state.counter+1});
	}

	render(props){

		return(

			<h1>Timer:{this.state.counter}</h1>
		);
	}
}

export default Timer;