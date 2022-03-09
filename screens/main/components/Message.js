import React from "react";
import Radium,{StyleRoot} from 'radium';
import Check from "../../../assets/images/check.png";
import Wrong from "../../../assets/images/close.png";
import animations from "../../animations"
export default ({text,error,hideAnimation})=>{
	return (
	<StyleRoot className="mega__infoBox beet" style={!hideAnimation ? animations.fadeInRight : animations.fadeOutRight}>
	<div/>
		<div className="mega__info beet">
			<img src={!error ? Check : Wrong} className="mega__image"/>
			<p className="mega__infoText">{text}</p>
		</div>
	</StyleRoot>
	)
}