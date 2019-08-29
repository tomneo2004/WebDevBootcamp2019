import {
	
	SIGN_IN,
	SIGN_OUT,
	UPDATE_USER

} from "./constant";

import {combineReducers} from 'redux';

// const initialState = {
// 	isSinginPending:false,
// 	isSignin:false
// }

// export const AppReducer = (state=initialState, action)=>{

// 	switch(action.type){
// 		case SIGN_IN:
// 			return Object.assign({}, state, {isSinginPending:false, isSignin:true});

// 		case SIGN_IN_PENDING:
// 			return Object.assign({}, state, {isSinginPending:true, isSignin:false});

// 		case SIGN_OUT:
// 			return Object.assign({}, state, {isSignin:false});

// 		case REGISTER:
// 			return Object.assign({}, state, {isSignin:true});

// 		default:
// 			return state;
// 	}
// }

const SigninInitState = {
	isSignin:false,
	user:{}
}

const SigninReducer = (state=SigninInitState, action={})=>{

	switch(action.type){
		case SIGN_IN:
			return Object.assign({}, state, {isSignin:true, user:action.payload});

		case SIGN_OUT:
			return Object.assign({}, state, SigninInitState);

		case UPDATE_USER:
			return Object.assign({}, state, {user:action.payload});

		default:
			return state;
	}
}



export default combineReducers({signin:SigninReducer});
