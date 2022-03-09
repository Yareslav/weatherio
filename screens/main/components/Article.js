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
  forwardRef
} from "react";
//images
import Logo from "../../../assets/images/logo.png";
import Search from "../../../assets/images/search.png";
import DropDownImage from "../../../assets/images/dropDown.png";
//images
//components
import cities from "../../cities";
import { MainContext } from "../App";
import fetcher from "../functions/fetcher";
import formater from "../functions/formater";
import CheckBox from "./CheckBox";
import Line from "./Line";
import DropDown from "./DropDown";
import CitiesSelectHelper from "./CitiesSelectHelper";
//components
//animations
import Radium,{StyleRoot} from 'radium';
import animations from "../../animations";
//animations
const Article = ({setCitiesOnMap,useAutoSelection}) => {

  const [checkBoxes, setCheckBoxes] = useState({
    north: false,
    west: false,
    south: false,
    east: false
  });

  const selectByNameInput=useRef() , selectByRegionInput=useRef();
  const [selectedCities, setSelectedCities,messageReducer] = useContext(MainContext);
  const [autoSelectCities,setAutoSelectCities]=useState(JSON.parse(localStorage.getItem("autoSelect")) || []);

  const [openedDropdown,setOpenedDropdown]=useState(false);
  const [hideDropDownAnimation,setHideDropDownAnimation]=useState(false);
  const dropDownChangeHandler=()=>{
    if (openedDropdown) {
      setHideDropDownAnimation(true);
      setTimeout(()=>{
        setOpenedDropdown((curr)=>!curr);
        setHideDropDownAnimation(false)
      },500)
    }
    else setOpenedDropdown((curr)=>!curr);
  }

  const [citiesSelectHelper,setCitiesSelectHelper]=useState({
    active:false,
    mass:[],
    hideAnimation:false
  });
  const citiesSelectHelperDisappear=()=>{
    setCitiesSelectHelper((curr)=>({...curr,hideAnimation:true}));
    setTimeout(()=>{
      setCitiesSelectHelper((curr)=>({...curr,hideAnimation:false,active:false}));
    },500)
  };

  const selectAllHandler=async()=>{
    const mass=[];
    const message={
      errors:0,
      successes:0,
      alreadyExists:0
    }
    for (let i=0;i<cities.length;i++) {
      let matches=false;
      selectedCities.forEach((elem)=>{
        if (elem.city==cities[i].title) {
          matches=true;
          console.log(cities[i]);
          message.alreadyExists++;
        }
      })
      if (matches) continue;
      try {
        const result=await fetcher(cities[i].title);
        const obj = await result.json();
        if (obj.error) throw new Error(obj.error.message);
        mass.push(formater(obj));
        message.successes++;
      }
      catch (error){
        message.errors++;
        console.log(cities[i]);
      }
    }
    messageReducer(`${message.successes} has been succesfully added , ${message.errors} was unsuccesfully added , ${message.alreadyExists} already exists n the table`,
    (message.errors!=0 || message.alreadyExists!=0));
    if (mass.length==0) return;
    setSelectedCities((curr)=>[...curr,...mass]);
  }

  const selectByNameHandler=async()=>{
    const text=selectByNameInput.current.value;
    if (text=="") return;
    selectByNameInput.current.value="";
    citiesSelectHelperDisappear();
    for (let i=0;i<selectedCities.length;i++) {
      if (selectedCities[i].city==text) return  messageReducer("city already exists in the table",false);
    }
    try {
      const result = await fetcher(text);
      const obj = await result.json();
      if (obj.error) throw new Error(obj.error.message);
      setSelectedCities((curr) => [...curr,formater(obj)]);
      messageReducer("1 city has been sucesfully added to the table",false);
    }
    catch (error){
      messageReducer(error.toString().split(":")[1],true)
    }
  }

  const selectByRegionHandler=()=>{
    let mass=[];
    const text=selectByRegionInput.current.value;
    const areCheckboxesNotEmpty=(checkBoxes.north || checkBoxes.west || checkBoxes.south || checkBoxes.east);
    if (text=="" && !areCheckboxesNotEmpty) {
      mass=cities;
    }
    else {
      if (areCheckboxesNotEmpty) mass=cities.filter(({region})=>checkBoxes[region]);
      else mass=cities;
      if (text!="") mass=mass.filter(({title})=>title.slice(0,text.length).toLocaleLowerCase()==text.toLocaleLowerCase());
    }
    setCitiesOnMap(mass);
  }

  const selectAllAutoSelectCitiesHandler=()=>{
    const mass=autoSelectCities;
    cities.forEach(({title})=>{
      if (!autoSelectCities.includes(title)) mass.push(title);
    });
    setAutoSelectCities([...mass]);
  }

  const keyUpHandler=(eve)=>{
    const text=selectByNameInput.current.value;
    if (text=="") return citiesSelectHelperDisappear();

    if (eve.key=="Enter") selectByNameHandler();

    let array=[];
    cities.forEach(({title})=>array.push(title));
    array=array.filter((elem)=>elem.slice(0,text.length).toLocaleLowerCase()==text.toLocaleLowerCase());

    if (array.length==0) citiesSelectHelperDisappear();
    else setCitiesSelectHelper((curr)=>({...curr,active:true,mass:[...array]}));
  }

  const autoSelectItems=useMemo(()=>{
    localStorage.setItem("autoSelect",JSON.stringify(autoSelectCities));
    return autoSelectCities.map((elem,ind)=><Line {...{elem,ind,autoSelectCities,setAutoSelectCities}}/>);
  },[autoSelectCities.length]);
  useEffect(() => {
    if (!useAutoSelection.current) return;
    useAutoSelection.current=false;
     (async ()=>{
       const result=[];
       let success=0;
       let errors=0;
       for (let i=0;i<autoSelectCities.length;i++) {
         try {
            const obj=await fetcher(autoSelectCities[i]);
            const jsonObj=await obj.json();
            result.push(formater(jsonObj));
            success++;
         }
         catch{
          errors++;
         }
       }
       setSelectedCities([...result]);
       if (!(errors===0 && success===0)) {
        messageReducer(`${success} cities has been sucesfully added to the table , ${errors} was unsuccesfully added`,(errors==0));
       }
     })()
  }, []);

  return (
      <StyleRoot className="article" style={animations.slideUp}>
      <img src={Logo} className="article__logo" />
      <div className="article__container beet2">

        <div className="article__partContainer beet2">
          <p className="article__title">Select city</p>
          <div className="width center">
            <input
              type="text"
              className="article__input"
              placeholder="type the name of city"
              ref={selectByNameInput}
              onKeyUp={keyUpHandler}
            />
            <img className="article__lupa" src={Search} onClick={selectByNameHandler}/>
          </div>
          {citiesSelectHelper.active && <CitiesSelectHelper {...{selectByNameHandler,selectByNameInput}} array={citiesSelectHelper.mass} hideAnimation={citiesSelectHelper.hideAnimation}/>}
          <div className="article__button" onClick={selectAllHandler}>
            <p>Select All</p>
          </div>
        </div>

        <div className="article__partContainer beet2">
          <p className="article__title">Select regions on map</p>
          <input
            type="text"
            className="article__input"
            placeholder="type the name of city"
            ref={selectByRegionInput}
          />
          <div className="article__checkBoxContainer beet2">
            <CheckBox text="North region" type="north" {...{setCheckBoxes,checkBoxes}}/>
            <CheckBox text="West region" type="west" {...{setCheckBoxes,checkBoxes}}/>
            <CheckBox text="South region" type="south" {...{setCheckBoxes,checkBoxes}}/>
            <CheckBox text="Eastern region" type="east" {...{setCheckBoxes,checkBoxes}}/>
          </div>
          <div className="article__button" onClick={selectByRegionHandler}>
            <p>Select</p>
          </div>
        </div>

				<div className="article__partContainer beet2">
          <p className="article__title">Auto Select</p>
					<div className="article__input center">
          {openedDropdown && <DropDown {...{setOpenedDropdown,autoSelectCities,setAutoSelectCities,hideDropDownAnimation}}/>}
						<div className="article__selectContainer beet">
							<p className="article__text">{autoSelectCities[autoSelectCities.length-1]}</p>
							<img src={DropDownImage} className={openedDropdown ? "article__activeDropdown" : ""} onClick={dropDownChangeHandler}/>
						</div>
					</div>
          <div className="article__autoFox beet2">
          {autoSelectItems}
          </div>
        </div>
        <div className="article__button" onClick={selectAllAutoSelectCitiesHandler}>
            <p>Select All</p>
          </div>
      </div>
    </StyleRoot>
  );
};
export default Article;
