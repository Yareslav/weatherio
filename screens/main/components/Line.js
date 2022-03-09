import Delete from "../../../assets/images/bin.png";
import Radium,{StyleRoot} from 'radium';
import animations from "../../animations";
import React,{useState,useEffect,useRef} from "react";
const Line=({elem,ind,autoSelectCities,setAutoSelectCities})=>{
  const [deleted,setDeleted]=useState(false);
  const clickHandler=()=>{
    const mass=[...autoSelectCities];
    mass.splice(ind,1);
    //!!bag fix , if user click on row delete animation doesn`t show
    if (deleted) {
      setDeleted(false);
      setTimeout(()=>{
        setDeleted(true);
      },0)
    } else setDeleted(true);
    setTimeout(()=>{
      setAutoSelectCities([...mass]);
    },500);
  }
  return (
  <StyleRoot className="article__autoLine center" style={!deleted  ? animations.slideUp : animations.slideOutLeft}>
    <div className="beet">
      <p className="article__text">{elem}</p>
      <div className="article__circle center" onClick={clickHandler}>
        <img src={Delete} />
      </div>
    </div>
  </StyleRoot>)
};
export default Line;