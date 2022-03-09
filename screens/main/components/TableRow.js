import {React,useContext,useState} from "react"
import { MainContext } from "../App";
import Radium,{StyleRoot} from 'radium';
import animations from "../../animations"
import Bin from "../../../assets/images/bin.png";
const TableRow=({elem,ind,searchByName,setSearchByName})=>{
	const [selectedCities, setSelectedCities,messageReducer] = useContext(MainContext);
	const [deleted,setDeleted]=useState(false);
	const clickHandler=()=>{
		const mass=[...selectedCities];
		mass.splice(ind,1);
		if (deleted) {
			setDeleted(false);
			setTimeout(()=>setDeleted(true),0)
		} else setDeleted(true);
		setTimeout(()=>{
			setSelectedCities([...mass]);
			if (searchByName.active) {
				const mass=searchByName.mass;
				let ind;
				mass.forEach((item,i)=>{
					if (item.city==elem.city) ind=i;
				})
				mass.splice(ind,1);
				setSearchByName((curr)=>({...curr,mass:[...mass]}));
			}
			messageReducer("1 store has been removed from the table",false);
		},500)
	}
	return (
		<StyleRoot className="table__row grid" style={!deleted ? animations.slideUp : animations.slideOutLeft}>
				<p>{elem.city}</p>
				<p>{elem.weather}</p>
				<img className="table__weatherIcon" src={elem.image}/>
				<p>{elem.time}</p>
				<p>{elem.region}</p>
				<p>{elem.cloudiness}</p>
				<p>{elem.humidity}</p>
				<p>{elem.temperature}</p>
				<p>{elem.windSpeed} km</p>
				<p>{elem.windTemperature}</p>
			<div className="table__circle center" onClick={clickHandler}>
				<img src={Bin} className="table__bin"/>
			</div>
		</StyleRoot>
	)
}
export default TableRow;