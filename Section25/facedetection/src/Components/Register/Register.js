import React, {Component} from "react";
import {connect} from 'react-redux';
import {RegisterAction} from '../../Containers/MainApp/actions';
import {Redirect} from 'react-router-dom';

const mapStateToProps = (state)=>{

	return {
		isRegisterPending:state.register.isRegisterPending
	}
}

const mapDispatchToProps = (dispatch)=>{

	return {
		onRegister: (evt, name, email, password, completeCB)=> dispatch(RegisterAction({name, email, password, completeCB}))
	}
	
}




class Register extends Component{

	constructor(){
		super();
		this.state = {
			isRegister: false
		}
	}

	handleRegisterForm(evt, onRegister){

		//we handle register form by ourself and
		//prevent it submit cause page refresh then lost redux store state
		evt.preventDefault();

		let name = document.getElementById("nameField").value;
		let email = document.getElementById("emailField").value;
		let password = document.getElementById("passwordField").value;
		onRegister(evt, name, email, password, ()=>{
			this.state.isRegister = true;
		});
	}

	render(){

	const {isRegisterPending, isRegister, onRegister} = this.props;

	if(!isRegisterPending && this.state.isRegister){

		return(
			<Redirect to='/' />
		);
	}

	return(
			<article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
				<main className="pa4 black-80">
				  <form className="measure center" onSubmit={(evt)=>this.handleRegisterForm(evt, onRegister)}>
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="nameField"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="emailField"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="passwordField"/>
				      </div>
				      <div className="">

				      	<input 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	value={isRegisterPending?"Signing up...":"Register"}/>

				      </div>
				    </fieldset>
				  </form>
				</main>
			</article>
		);
	}

	
	
	
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
