import {React,useState} from "react";
import QuestionMarkImage from "../../../assets/images/questionMark.png";
import Close from "../../../assets/images/close.png";
const CreateQuestionMark=({helpMenuState,setHelpMenuState})=>{
  const [animate,setAnimate]=useState(false);
  const clickHandler=()=>{
    if (helpMenuState.isOpen) {
      setHelpMenuState((curr)=>({...curr,hideAnimation:true}));
      setTimeout(()=>{
        setHelpMenuState((curr)=>({...curr,hideAnimation:false,isOpen:false}));
      },1000)
    } else setHelpMenuState((curr)=>({...curr,isOpen:true}))
  }
  return (
  <div
   className={"mega__questionMark center "+(animate ? "swipeAnimation" : "")}
   onMouseEnter={()=>setAnimate(true)}
   onMouseLeave={()=>setAnimate(false)}
   onClick={clickHandler}
   >
    <img src={helpMenuState.isOpen ? Close : QuestionMarkImage}/>
  </div>)
}
export default CreateQuestionMark;