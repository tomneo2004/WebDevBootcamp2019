import {

	SIGN_IN,
	SIGN_IN_PENDING,
	SIGN_OUT,
	REGISTER,
	REGISTER_PENDING

} from "./constant";

export const SigninAction = ({email, password})=>{
	
	return (dispatch) =>{

		dispatch({type:SIGN_IN_PENDING})

		setTimeout(()=>{dispatch({
			type:SIGN_IN,
			payload: {email:email, password:password}
		})}, 3000);
	}
	
}

export const RegisterAction = ({name, email, password, completeCB})=>{

	return (dispatch) => {

		dispatch({type:REGISTER_PENDING})

		setTimeout(()=>{
			completeCB();
			dispatch({
			type: REGISTER,
			payload: {name:name, email:email, password:password}
			})
		}, 3000);

		
	}
}

export const SignoutAction = ()=>{
	return{
		type: SIGN_OUT,
		payload: ""
	}
}