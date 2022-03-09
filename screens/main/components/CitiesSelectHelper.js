import {React , useState,useEffect,useMemo,useCallback,useReducer,useContext,useRef} from 'react';
import Radium,{StyleRoot} from 'radium';
import animations from "../../animations";
const CitiesSelectHelper=({selectByNameHandler,selectByNameInput,array,hideAnimation})=>{
  const clickHandler=(city)=>{
    selectByNameInput.current.value=city;
    selectByNameHandler();
  }
  const mass=useMemo(()=>{
    return array.map((elem,ind)=><StyleRoot className="article__line center" onClick={()=>clickHandler(elem)} style={ind%2==0 ? animations.fadeInRight : animations.fadeInLeft}>
      <p>{elem}</p>
    </StyleRoot>)
  },[array.length]);
  return (
  <StyleRoot className="article__inputHelper center" style={!hideAnimation ? animations.zoomIn : animations.zoomOut}>
    <div className="article__citiesContainer beet2">{mass}</div>
  </StyleRoot>
  )
}
export default CitiesSelectHelper;