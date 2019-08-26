import React, {Component} from "react";
import {connect} from 'react-redux';
import {SigninAction} from '../../Containers/MainApp/actions';
import {Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = (dispatch)=>{

	return {
		onSignin: (userData)=> dispatch(SigninAction(userData))
	}
	
}



class Signin extends Component{

	constructor(){
		super();
		this.state = {
			isSinginPending: false,
			name:"",
			email:"",
			password:""
		}
	}

	onEmailChange = (evt)=>{
		this.setState({email:evt.target.value});	
	}

	onPasswordChange = (evt)=>{
		this.setState({password:evt.target.value});	
	}

	handleSigninForm = (evt)=>{

		//we handle sign in form by ourself and
		//prevent it submit cause page refresh then lost redux store state
		evt.preventDefault();

		const {onSignin} = this.props;

		let email = this.state.email;
		let password = this.state.password;

		this.setState({isSinginPending:true});

		fetch("http://localhost:3000/signin", {
			method:'post',
			headers:{'Content-Type': 'application/json'},
			body:JSON.stringify({
				email:email,
				password:password
			})
		})
		.then(res=>res.json())
		.then(data=>{
			console.log(data);
			onSignin(data);
			this.props.history.push('/');
		});

		
	}

	render(){
		
		return(

				<article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
					<main className="pa4 black-80">
					  <form className="measure center" onSubmit={this.handleSigninForm}>
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
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
					      	value={this.state.isSinginPending?"Signing in....":"Sign in"}/>

					      </div>
					      <div className="lh-copy mt3">
					      	<Link to="/Register" className="f5 link dim black db pointer">Register</Link>
					      </div>
					    </fieldset>
					  </form>
					</main>
				</article>
		)
	}
	
}

export default withRouter(connect(null, mapDispatchToProps)(Signin));
