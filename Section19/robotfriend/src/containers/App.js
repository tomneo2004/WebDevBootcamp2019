import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import {robots} from "../robots";
import Timer from "../Timer";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

class App extends Component{

	constructor(){
		super();

		this.state = {
			robots:[],
			searchField:""
		}
	}

	componentDidMount(){

		fetch("https://jsonplaceholder.typicode.com/users")
		.then(response=> response.json())
		.then(users=> this.setState({robots:users}));
	}

	onSearchChanged = (event)=>{

		this.setState({searchField:event.target.value});

	}

	render(){

		const {robots, searchField} = this.state;

		const filterRobots = robots.filter((robot)=>{

			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});

		if(!robots.length){
			return <h1>Loading</h1>
		}
		else{

			return (

				<div className="tc">
					<Timer display={true} />
					<h1 className="f1">RobotFriends</h1>
					<SearchBox searchField={this.onSearchChanged} />

					<Scroll>
						<ErrorBoundary>
							<CardList robots={filterRobots} />
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;