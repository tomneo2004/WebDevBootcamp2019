import React, {Component} from "react";
import Logo from "../../Components/Logo/Logo";
import ImageLinkForm from "../../Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../../Components/FaceRecognition/FaceRecognition";
import Rank from "../../Components/Rank/Rank";
import Clarifai from 'clarifai';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {UpdateUserAction} from '../../Containers/MainApp/actions';


const app = new Clarifai.App({
 apiKey: '125b100789d5484f9e096e481a38b4dd'
});

const mapStateToProps = (state)=>({

	isSignin: state.signin.isSignin,
	user: state.signin.user
});

const mapDispatchToProps = (dispatch)=>{

	return {
		onUpdateUser: (userData)=> dispatch(UpdateUserAction(userData))
	}
	
}

class FaceDetectionApp extends Component{

	constructor(){

		super();

		this.state= {
			input: "",
			imageURL: "",
			boundingBox: {},
			detectingFace:false
		}
	}

	calculateFaceBox = (data)=>{

		let box = data.outputs[0].data.regions[0].region_info.bounding_box;
		console.log(box);

		let imageElement = document.getElementById("imageBox");
		
		return {

			leftCol: imageElement.width * box.left_col,
			topRow: imageElement.height * box.top_row,
			rightCol: imageElement.width - (imageElement.width * box.right_col),
			bottomRow: imageElement.height - (imageElement.height * box.bottom_row)
		}
	}

	onInputChange = (event)=>{

		this.setState({input:event.target.value});
	}

	onSubmit = ()=>{

		const {user, onUpdateUser} = this.props;

		this.setState({imageURL:this.state.input}, ()=>{

			this.setState({detectingFace:true});

			app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageURL).then(
		    (response) => {

		    	fetch("http://localhost:3000/image", {
					method:'put',
					headers:{'Content-Type': 'application/json'},
					body:JSON.stringify({
						id:user.id
					})
				})
				.then(res=>res.json())
				.then(data=>{
					console.log(data);
					let userUpdateData = Object.assign({}, user, {entries:data});
					onUpdateUser(userUpdateData);
				});

		    	this.setState({detectingFace:false,boundingBox:this.calculateFaceBox(response)});
		    },
		    (err) => {
		      console.log(err);
		      this.setState({detectingFace:false});
		    }
		  	);
		});
	}

	render(){

	  const {isSignin, user} = this.props;
	  console.log(user);

	  //if user sign in then they can use face detection
	  //otherwise redirect user to sign in page
	  if(!isSignin){
	  	return(
	  		<Redirect to='/Signin' />
	  	);
	  }
	  return (
	    <div>
	    	<Logo />
	      	<Rank name={user.name} rank={user.entries}/>
	      	<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
	      	<FaceRecognition imageURL={this.state.imageURL} boundingBox={this.state.boundingBox} detectingFace={this.state.detectingFace}/>
	    </div>
	  );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceDetectionApp);

