import Ok from "../../../assets/images/ok.png";
import Radium,{StyleRoot} from 'radium';
import animations from "../../animations";
import React from "react";
const CheckBox = ({ text, type,setCheckBoxes,checkBoxes }) => {
  const clickHandler = () => {
    checkBoxes[type] = !checkBoxes[type];
    setCheckBoxes({ ...checkBoxes });
  };
  return (
    <div className="beet">
      <StyleRoot className="article__checkBox center" onClick={clickHandler}>
        {checkBoxes[type] && <img src={Ok} className="article__okImage " style={{animation:"all 1s linear",...animations.appear}}/>}
      </StyleRoot>
      <p className="article__text article__marginLeft">{text}</p>
    </div>
  );
};
export default CheckBox;