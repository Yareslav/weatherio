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
  createContext
} from "react";
import Article from "./components/Article";
import Map from "./components/Map";
import Table from "./components/Table";
import Message from "./components/Message";
import cities from "../cities";
import QuestionMark from "./components/QuestionMark";
import HelpMenu from "./components/HelpMenu";
export const MainContext=createContext();
const  App=()=> {
  const useAutoSelection=useRef(true);

  const [citiesOnMap,setCitiesOnMap]=useState(cities);

  const [openedArticle,setOpenedArticle]=useState(false);

  const [showArticle,setShowArticle]=useState(true);

  const [selectedCities,setSelectedCities]=useState([]);

  const resize=()=>{
    if (window.innerWidth<=800 && showArticle) setShowArticle(false);
    else if (window.innerWidth>800 && !showArticle) {
      setOpenedArticle(false);
      setShowArticle(true);
    }
  }
  const [helpMenuState,setHelpMenuState]=useState({
    isOpen:false,
    hideAnimation:false
  });
  const [messageBox,setMessageBox]=useState({
    active:false,
    error:false,
    text:"",
    hideAnimation:false
  });
  const messageBoxTimeout=useRef({
    animation:null,
    show:null
  });
  const messageReducer=(text,error)=>{
    setMessageBox((curr)=>({...curr,text:text,error:error,active:true}));
    if (messageBox.active) {
      clearTimeout(messageBoxTimeout.current.show);
      clearTimeout(messageBoxTimeout.current.animation);
    }
    messageBoxTimeout.current.animation=setTimeout(()=>{
      setMessageBox((curr)=>({...curr,hideAnimation:true}))
    },2500);
    messageBoxTimeout.current.show=setTimeout(()=>{
      setMessageBox((curr)=>({...curr,active:false,hideAnimation:false}))
    },3000);
  }

  useEffect(() => {
    window.addEventListener("resize",resize);
    return ()=>window.removeEventListener("resize",resize);
  });
  useEffect(() => {
   resize();
  }, []);

  return (<>
    <div className="mega beet">
      <div className="mega__burger beet2" onClick={()=>setOpenedArticle((curr)=>!curr)}>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
      <QuestionMark {...{helpMenuState,setHelpMenuState}}/>
      {helpMenuState.isOpen && <HelpMenu hideAnimation={helpMenuState.hideAnimation}/>}
      <MainContext.Provider value={[selectedCities,setSelectedCities,messageReducer]}>
      {(openedArticle || showArticle) && <Article setCitiesOnMap={setCitiesOnMap} useAutoSelection={useAutoSelection}/>}
        <div className="body">
          <Map citiesOnMap={citiesOnMap} />
          {messageBox.active && <Message {...messageBox}/>}
          <Table />
        </div>
      </MainContext.Provider>
    </div>
  </>)
}
export default App;
/*
const key="AIzaSyBEIqK7j9rLo7FHM4Fdl41EITEsGLHFx9E" , book="Harry Poter";
fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${key}&maxResults=40`).then((res)=>{
  res.json().then((mess)=>{
    console.log(mess.items);
  })
})*/