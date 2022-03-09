import { slideInLeft,slideOutLeft,fadeOut,fadeIn,fadeInRight,slideInUp,fadeOutRight,slideOutDown,bounce,zoomIn,fadeInLeft,zoomOut,rollIn,rollOut,slideInRight,slideOutRight } from 'react-animations';
import Radium,{StyleRoot} from 'radium';
export default {
	slideUp:{
		animation: 'all 1s linear',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
	},
	slideDown:{
		animation:'all 1s linear',
		animationName:Radium.keyframes(slideOutLeft, 'slideOutLeft')
	},
	appear:{
		animation:'all 0.5s linear forwards',
		animationName:Radium.keyframes(fadeIn, 'fadeIn')
	},
	fadeOut:{
		animation:'all 0.5s linear forwards',
		animationName:Radium.keyframes(fadeOut, 'fadeOut')
	},
	fadeInRight:{
		animation:'all 0.5s linear forwards',
		animationName:Radium.keyframes(fadeInRight, 'fadeInRight')
	},
	fadeInLeft:{
		animation:'all 0.5s linear forwards',
		animationName:Radium.keyframes(fadeInLeft, 'fadeInLeft')
	},
	fadeOutRight:{
		animation:'all 0.5s linear forwards',
		animationName:Radium.keyframes(fadeOutRight, 'fadeOutRight')
	},
	slideInUp:{
		animation:'all 1s linear',
		animationName:Radium.keyframes(slideInUp, 'slideInUp')
	},
	slideOutDown:{
		animation:'all 0.5s linear',
		animationName:Radium.keyframes(slideOutDown, 'slideOutDown')
	},
	bounce:{
		animation:'all 2s linear',
		animationName:Radium.keyframes(bounce, 'bounce')
	},
	zoomIn:{
		animation:'all 0.5s linear',
		animationName:Radium.keyframes(zoomIn, 'zoomIn')
	},
	zoomOut:{
		animation:'all 0.5s linear',
		animationName:Radium.keyframes(zoomOut, 'zoomOut')
	},
	rollIn:{
		animation:'all 1s linear',
		animationName:Radium.keyframes(rollIn, 'rollIn')
	},
	rollOut:{
		animation:'all 1s linear',
		animationName:Radium.keyframes(rollOut, 'rollOut')
	},
	slideInRight:{
		animation: 'all 0.5s linear',
    animationName: Radium.keyframes(slideInRight, 'slideInRight')
	},
	slideInLeft:{
		animation: 'all 0.5s linear',
    animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
	},
	slideOutLeft:{
		animation: 'all 0.5s linear',
    animationName: Radium.keyframes(slideOutLeft, 'slideOutLeft')
	},
	slideOutRight:{
		animation: 'all 0.5s linear',
    animationName: Radium.keyframes(slideOutRight, 'slideOutRight')
	}
}