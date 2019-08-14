import {CHANGE_SEARCH_FIELD, UPDATE_SEARCH_RESULT_COUNT} from "./constant";

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