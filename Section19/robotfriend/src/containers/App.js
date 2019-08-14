import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import {robots} from "../robots";
import Timer from "../Timer";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";
import {connect} from "react-redux";
import {setSearchField, updateResultCount} from "../actions";

const mapStateToProps = state => {
		
		return {
			searchField:state.searchField,
			resultCount:state.resultCount
		}
}
	

const mapDispatchToProps = dispatch => {

		return {
			onSearchChanged: (event) => dispatch(setSearchField(event.target.value)),
			onUpdateResultCount: (resultCount) => dispatch(updateResultCount(resultCount))
		}
}

class App extends Component{

	constructor(){
		super();

		this.state = {
			robots:[]
		}
	}

	componentDidMount(){

		fetch("https://jsonplaceholder.typicode.com/users")
		.then(response=> response.json())
		.then(users=> this.setState({robots:users}));
	}

	render(){

		console.log(this.props.resultCount);
		const {robots} = this.state;

		const {searchField, resultCount, onSearchChanged, onUpdateResultCount} = this.props;

		const filterRobots = robots.filter((robot)=>{

			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});

		onUpdateResultCount(filterRobots.length);

		if(!robots.length){
			return <h1>Loading</h1>
		}
		else{

			return (

				<div className="tc">
					<Timer display={true} />
					<h1 className="f1">RobotFriends</h1>
					<SearchBox searchField={onSearchChanged} />
					<h1>Search result count:{resultCount}</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
