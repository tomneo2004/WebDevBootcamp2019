import {
	CHANGE_SEARCH_FIELD, 
	UPDATE_SEARCH_RESULT_COUNT,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from "./constant";

const initialState = {
	searchField:"",
	resultCount:0
};

export const searchRobots = (state=initialState, action={})=>{

	switch(action.type){

		case CHANGE_SEARCH_FIELD:

			return Object.assign({}, state, {searchField:action.payload});

		case UPDATE_SEARCH_RESULT_COUNT:

			return Object.assign({}, state, {resultCount:action.payload});

		default:
			return state;
	}
}

const initialStateRobots = {
	isPending: false,
	robots: [],
	error: ""
}

export const requestRobots = (state=initialStateRobots, action={})=>{

	switch(action.type){
		case REQUEST_ROBOTS_PENDING:
			return Object.assign({}, state, {isPending:true});

		case REQUEST_ROBOTS_SUCCESS:
			return Object.assign({}, state, {robots:action.payload, isPending:false});

		case REQUEST_ROBOTS_FAILED:
			return Object.assign({}, state, {error:action.payload, isPending:false});

		default:
			return state;
	}
}