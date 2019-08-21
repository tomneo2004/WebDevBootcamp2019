import React, {Component} from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Signin from "./Components/Signin/Signin";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Rank from "./Components/Rank/Rank";
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particleOptions = {

	particles:{
		number:{
			value: 100,
			density:{
				enable:true,
				value_area:800
			}
		}
	}
}

const app = new Clarifai.App({
 apiKey: '125b100789d5484f9e096e481a38b4dd'
});

class App extends Component {

	constructor(){

		super();

		this.state= {
			input: "",
			imageURL: "",
			boundingBox: {},
			route: "signin"
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

		this.setState({imageURL:this.state.input}, ()=>{

			app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageURL).then(
		    (response) => {

		    	this.setState({boundingBox:this.calculateFaceBox(response)});
		    },
		    (err) => {
		      console.log(err);
		    }
		  	);
		});
	 
	}

	onRouteChange = (route)=>{
		this.setState({route:route});
	}

	render(){

	  return (
	    <div className="App">
	    	<Particles className="particles" 
	              params={particleOptions}
	        />
	     	<Navigation onRouteChange={this.onRouteChange} />
	     	{ this.state.route === "signin" ?
		     	<Signin onRouteChange={this.onRouteChange} />
		     	:
		     	<div>
			      	<Logo />
			      	<Rank />
			      	<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
			      	<FaceRecognition imageURL={this.state.imageURL} boundingBox={this.state.boundingBox}/>
		      	</div>
	      	}
	    </div>
	  );
	}
}

export default App;
