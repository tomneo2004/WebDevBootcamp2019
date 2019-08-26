import React, {Component} from "react";
import {connect} from 'react-redux';
import {SigninAction} from '../../Containers/MainApp/actions';
import { withRouter } from "react-router-dom";


const mapDispatchToProps = (dispatch)=>{

	return {
		onSignin: (userData)=> dispatch(SigninAction(userData))
	}
	
}

class Register extends Component{

	constructor(){
		super();
		this.state = {
			isRegistering: false,
			name:"",
			email:"",
			password:""
		}
	}

	onNameChange = (evt)=>{
		this.setState({name:evt.target.value});	
	}

	onEmailChange = (evt)=>{
		this.setState({email:evt.target.value});	
	}

	onPasswordChange = (evt)=>{
		this.setState({password:evt.target.value});	
	}

	handleRegisterForm = (evt)=>{

		//we handle register form by ourself and
		//prevent it submit cause page refresh then lost redux store state
		evt.preventDefault();

		const {onSignin} = this.props;

		let name = this.state.name;
		let email = this.state.email;
		let password = this.state.password;

		this.setState({isRegistering:true});

		fetch("http://localhost:3000/register", {
			method:'post',
			headers:{'Content-Type': 'application/json'},
			body:JSON.stringify({
				name:name,
				email:email,
				password:password
			})
		})
		.then(res=>res.json())
		.then(data=>{

			console.log('register',data);
			//auto sign in
			onSignin(data);

			//redirect to home
			this.props.history.push('/');
		});

		

	}

	render(){

		return(
				<article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
					<main className="pa4 black-80">
					  <form className="measure center" onSubmit={this.handleRegisterForm}>
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
					        onChange={this.onNameChange}
					        type="text" name="name"  id="nameField"/>
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        onChange={this.onEmailChange}
					        type="email" name="email-address"  id="emailField"/>
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        onChange={this.onPasswordChange}
					        type="password" name="password"  id="passwordField"/>
					      </div>
					      <div className="">

					      	<input 
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value={this.state.isRegistering?"Signing up...":"Register"}/>

					      </div>
					    </fieldset>
					  </form>
					</main>
				</article>
			);
	}

	
	
	
	
}

export default withRouter(connect(null, mapDispatchToProps)(Register));
