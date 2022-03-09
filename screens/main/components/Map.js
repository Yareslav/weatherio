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
import Ukraine from "../../../assets/images/ukraine.png";
import ArrowUp from "../../../assets/images/arrowUp.png";
import Dot from "./Dot";
import Radium,{StyleRoot} from 'radium';
import animations from "../../animations";
const Map = ({citiesOnMap}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [mapHeight,setMapHeight]=useState();
  const [dragging,setDragging]=useState(false);

  const map = useRef();
  const resize = () => {
    const {width,height} = map.current.getBoundingClientRect();
    setSize({ width: width, height: height });
  };

  const moveHandler=(eve)=>{
    if (!dragging) return;
    setMapHeight(eve.clientY);
  }
  const dots = useMemo(() => {
    return citiesOnMap.map(({ title, x, y },ind) => <Dot {...{ x, y, title, size,ind }} />);
  }, [size,citiesOnMap.length]);

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  });

  return (
    <div className="map" onMouseMove={moveHandler} style={{height:mapHeight}}>
      <div className="map__container center" >
        <img src={Ukraine} className="map__ukraine" ref={map}/>
        {dots}
      </div>
      <div className="map__line" />
      <StyleRoot className={"map__resizer center "+(dragging ? "map__activeResizer" : "")} onClick={()=>setDragging((curr)=>!curr)} style={animations.bounce}>
        <img src={ArrowUp} draggable={false} onLoad={resize} />
      </StyleRoot>
    </div>
  );
};
export default Map;
