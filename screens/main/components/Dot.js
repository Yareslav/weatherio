import {
  React,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import fetcher from "../functions/fetcher";
import formater from "../functions/formater";
import animations from "../../animations";
import Radium,{StyleRoot} from 'radium';
import { MainContext } from "../App";
const Dot = ({ x, y, title, size,ind }) => {
  const [pressed,setPressed]=useState(false);
  const initialRef=useRef(true);
  const [selectedCities, setSelectedCities,messageReducer] = useContext(MainContext);
  const clickHandler = async () => {
    if (pressed) return;
    setPressed(true);
    initialRef.current=false;
    setTimeout(()=>setPressed(false),500)
    for (let i=0;i<selectedCities.length;i++) {
      if (selectedCities[i].city==title) return messageReducer("city already exists in the table",false);
    }
    try {
      const result = await fetcher(title);
      const obj = await result.json();
      if (obj.error) throw new Error(obj.error.message);
      setSelectedCities((curr) => [...curr,formater(obj)]);
      messageReducer("1 city has been succesfully added to the table",false);
    } catch (error){
      messageReducer(error.toString().split(":")[1],true)
    }
  };
  const styles={
    opacity:0,
    marginTop: `${(y / 100) * size.height}px`,
    marginLeft: `${(x / 100) * size.width}px`,
    ...(!pressed ? animations.appear : animations.fadeOut),
    animation:`all 1s linear ${initialRef.current ? 0.2*ind : 0}s forwards`,
  }
  return (
    <StyleRoot
    className="map__dotContainer beet2"
    style={styles}
    onClick={clickHandler}
    >
      <div className="map__dot center">
        <div />
      </div>
      <p className="font">{title}</p>
    </StyleRoot>
  );
};
export default Dot;
