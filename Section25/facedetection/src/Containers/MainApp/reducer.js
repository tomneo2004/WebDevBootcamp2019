import {
	
	SIGN_IN,
	SIGN_IN_PENDING,
	SIGN_OUT,
	REGISTER,
	REGISTER_PENDING

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
	isSinginPending:false,
	isSignin:false
}

const SigninReducer = (state=SigninInitState, action={})=>{

	switch(action.type){
		case SIGN_IN:
			return Object.assign({}, state, {isSinginPending:false, isSignin:true});

		case SIGN_IN_PENDING:
			return Object.assign({}, state, {isSinginPending:true, isSignin:false});

		case SIGN_OUT:
			return Object.assign({}, state, {isSignin:false});

		default:
			return state;
	}
}

const RegisterInitState = {
	isRegisterPending:false
}

const RegisterReducer = (state=RegisterInitState, action={})=>{

	switch(action.type){

		case REGISTER_PENDING:
			return Object.assign({}, state, {isRegisterPending:true});

		case REGISTER:
			return Object.assign({}, state, {isRegisterPending:false});

		default:
			return state;
	}
}

export default combineReducers({signin:SigninReducer, register:RegisterReducer});
