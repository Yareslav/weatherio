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
import Close from "../../../assets/images/close.png";
import { MainContext } from "../App";
import TableRow from "./TableRow";
import Radium,{StyleRoot} from 'radium';
import animations from "../../animations";
const Table = () => {
	const [selectedCities, setSelectedCities,messageReducer] = useContext(MainContext);
	const [searchByName,setSearchByName]=useState({
		active:false,
		mass:[]
	})
	const input=useRef();
	const rows=useMemo(()=>{
		return (searchByName.active ? searchByName.mass : selectedCities).map((elem,ind)=><TableRow {...{elem,ind,searchByName,setSearchByName}} />)
	},[selectedCities.length,searchByName.mass.length,searchByName.active]);

	const clearInputHandler=()=>{
		setSearchByName({active:false,mass:[]});
		input.current.value="";
	}
	const changeHandler=()=>{
		const text=input.current.value;
		if (text=="") setSearchByName({active:false,mass:[]});
		else {
			const mass=selectedCities.filter(({city})=>city.slice(0,text.length).toLowerCase()==text.toLowerCase());
			setSearchByName({mass:[...mass],active:true});
		}
	}
	const clearAllHandler=()=>{
		if (selectedCities.length===0) return;
		setClearAllAnimation(false);
		setTimeout(()=>setClearAllAnimation(true),500);
		setSelectedCities([]);
		messageReducer(`${selectedCities.length} cities was succesfully removed from the table`,false)
	}
	const [clearAllAnimation,setClearAllAnimation]=useState(true);
  return (
    <div className="table">
		<div className="width beet">
			<StyleRoot className="table__margin beet" style={clearAllAnimation ? animations.appear : animations.fadeOut}>
				<img src={Close} className="table__clearAll" onClick={clearAllHandler}/>
				<p className="table__clearAllTitle">Clear all</p>
			</StyleRoot>
			<div className="table__fixedInput center">
					<input
						type="text"
						className="article__input"
						placeholder="type the name of city"
						ref={input}
						onChange={changeHandler}
					/>
					{searchByName.active && <img className="article__lupa" src={Close} onClick={clearInputHandler}/>}
			</div>
		</div>

			<div className="table__main beet2">
				<div className="table__header grid">
						<p>City</p>
						<p>Weather</p>
						<p>Image</p>
						<p>Time</p>
						<p>Region</p>
						<p>Cloudness</p>
						<p>Humidity</p>
						<p>Temperature (C)</p>
						<p>Wind speed</p>
						<p>Wind temperature</p>
						<p></p>
				</div>
				<div className="table__body center">
					<div className="table__container">
						{rows}
					</div>
				</div>
			</div>
    </div>
  );
};
export default Table;