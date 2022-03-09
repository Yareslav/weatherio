import Radium,{StyleRoot} from 'radium';
import animations from "../../animations";
import React from "react";
import cities from "../../cities";
const DropDown=({autoSelectCities,setAutoSelectCities,hideDropDownAnimation})=>{
  const clickHandler=(title)=>{
    if (autoSelectCities.includes(title)) return;
    setAutoSelectCities((curr)=>[...curr,title]);
  }
  return <StyleRoot className="article__dropDown center" style={!hideDropDownAnimation ?animations.slideInUp : animations.slideOutDown}>
    <div className="article__dropDownContainer beet2">
    {cities.map(({title})=>(<div className={"article__line center "+(autoSelectCities.includes(title) ? "article__alreadySelectedLine" : "")} onClick={()=>clickHandler(title)}>
      <p>{title}</p>
    </div>))}
    </div>
  </StyleRoot>
}
export default DropDown;