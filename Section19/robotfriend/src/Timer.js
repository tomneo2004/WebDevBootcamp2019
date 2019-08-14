import React, {Component} from "react";
import "./Timer.css";

class Timer extends Component{

	constructor(){
		super();

		this.state={
			counter: 0,
			timerId:null
		}
	}

	componentDidMount(){

		this.restartTimer();
	}

	tick = ()=>{

		this.setState({counter:this.state.counter+1});
	}

	restartTimer = ()=>{

		if(this.state.timerId){
			clearInterval(this.state.timerId);
		}

		this.setState({
			counter:0,
			timerId:setInterval(this.tick, 1000)
		});
	}

	display(onOff){
		if(onOff){
			return <h1 className="timerTitle" onClick={this.restartTimer}>Timer:{this.state.counter}(Click to restart)</h1>
		}
	}


	render(props){

		return(
			<div>
				{this.display(this.props.display)}
			</div>
		);
	}
}

export default Timer;