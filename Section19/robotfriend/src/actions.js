import {CHANGE_SEARCH_FIELD, UPDATE_SEARCH_RESULT_COUNT} from "./constant";

export const setSearchField = (text)=>({
	type:CHANGE_SEARCH_FIELD,
	payload:text
});

export const updateResultCount = (resultCount)=>({
	type:UPDATE_SEARCH_RESULT_COUNT,
	payload:resultCount
});
