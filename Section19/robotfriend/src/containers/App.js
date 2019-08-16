import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import {robots} from "../robots";
import Timer from "../Timer";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";
import {connect} from "react-redux";
import {setSearchField, updateResultCount, requestRobots} from "./actions";


const mapStateToProps = state => {
		
		return {
			searchField: state.searchRobots.searchField,
			resultCount: state.searchRobots.resultCount,
			robots: state.requestRobots.robots,
			isPending : state.requestRobots.isPending,
			error: state.requestRobots.error 
		}
}
	

const mapDispatchToProps = dispatch => {

		return {
			onSearchChanged: (event) => dispatch(setSearchField(event.target.value)),
			onUpdateResultCount: (resultCount) => dispatch(updateResultCount(resultCount)),
			onRequestRobots: () => dispatch(requestRobots())
		}
}

class App extends Component{

	// constructor(){
	// 	super();

	// 	this.state = {
	// 		robots:[]
	// 	}
	// }

	componentDidMount(){

		// fetch("https://jsonplaceholder.typicode.com/users")
		// .then(response=> response.json())
		// .then(users=> this.setState({robots:users}));

		this.props.onRequestRobots();
	}

	render(){

		const {

			searchField,
		 	resultCount,
		 	onSearchChanged,
		  	onUpdateResultCount,
		  	robots,
		  	isPending

		  } = this.props;

		const filterRobots = robots.filter((robot)=>{

			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});

		// onUpdateResultCount(filterRobots.length);

		if(isPending){
			return <h1>Loading</h1>
		}
		else{

			return (

				<div className="tc">
					<Timer display={true} />
					<h1 className="f1">RobotFriends</h1>
					<SearchBox searchField={onSearchChanged} />
					{ /* <h1>Search result count:{resultCount}</h1> */}
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
