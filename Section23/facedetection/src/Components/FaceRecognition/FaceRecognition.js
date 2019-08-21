import React from "react";
import "./FaceRecognition.css";


const FaceRecognition = ({imageURL, boundingBox})=>{

	return(

		<div className="center ma">
			<div className="absolute mt2">
				<img id="imageBox" alt="FaceRecognition" src={imageURL} width="500px" height="auto"/>
				<div className="bounding-box" style={{left:boundingBox.leftCol, top:boundingBox.topRow, right:boundingBox.rightCol, bottom:boundingBox.bottomRow}}>
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;