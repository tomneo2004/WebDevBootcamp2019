import {

	SIGN_IN,
	SIGN_OUT,
	UPDATE_USER

} from "./constant";

export const SigninAction = (userData)=>{
	
	return (dispatch) =>{

		dispatch({
			type:SIGN_IN,
			payload:userData
		})

	}
	
}

export const SignoutAction = ()=>{
	return{
		type: SIGN_OUT,
		payload: ""
	}
}

export const UpdateUserAction = (userData)=>{
	return{
		type:UPDATE_USER,
		payload:userData
	}
}

