import Radium, { StyleRoot } from "radium";
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
  createContext,
} from "react";
import Logo from "../../../assets/images/logo.png";
import animations from "../../animations";
import ArrowLeft from "../../../assets/images/arrowLeft.png";
import ArrowRight from "../../../assets/images/arrowRight.png";
import Convenient from "../../../assets/images/convenient.png";
import Progress from "../../../assets/images/progress.jpg";
import Fast from "../../../assets/images/speed.jpg";
const CreateHelpMenu = ({ hideAnimation }) => {
  const [index, setIndex] = useState(0);
  const [animation,setAnimation]=useState({});
  const [ignore,setIgnore]=useState(false);
  const images = [
      { image: Convenient, title: "Convenient" },
      { image: Progress, title: "Modern" },
      { image: Fast, title: "Fast" }
  ];
  const balls = useMemo(() => {
    const mass = [];
    for (let i = 0; i < images.length; i++) {
      mass.push(
        <div
          className={
            "helpMenu__ball" + (index == i ? " helpMenu__selectedBall" : "")
          }
          onClick={() => dotClick(i)}
        />
      );
    }
    return mass;
  }, [index,ignore]);
  const dotClick = (i) => {
    if (i === index || ignore) return;
    setIgnore(true);
    setTimeout(()=>setIgnore(false),1000)
    setAnimation(!(i<index) ? animations.slideOutLeft : animations.slideOutRight);
    setTimeout(()=>{
      setAnimation(i<index ? animations.slideInLeft : animations.slideInRight);
      setIndex(i);
    },500)
  };
  const clickHandler = (type) => {
    if (ignore) return;
    setIgnore(true);
    setTimeout(()=>setIgnore(false),1000);
    setAnimation(!(type=="left") ? animations.slideOutLeft : animations.slideOutRight);
    setTimeout(()=>{
      setAnimation(type=="left" ? animations.slideInLeft : animations.slideInRight);
      if (type == "left") {
        if (index == 0) setIndex(images.length - 1);
        else setIndex((curr) => curr - 1);
        return;
      }
      if (index == images.length - 1) setIndex(0);
      else setIndex((curr) => curr + 1);
    },500)

  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      clickHandler("right");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [index,ignore]);

  return (
    <StyleRoot
      className="helpMenu center"
      style={!hideAnimation ? animations.rollIn : animations.rollOut}
    >
      <div className="helpMenu__blackFon" />
      <div className="helpMenu__info">
        <div className="helpMenu__greeting beet">
          <p>Welcome to</p>
          <img src={Logo} />
        </div>
        <div className="helpMenu__sliderContainer beet2">

          <div className="helpMenu__slider beet">
            <Button {...{clickHandler,ignore}} type="left" />
            <div className="helpMenu__container center">
              <StyleRoot
                className="helpMenu__slideImage center"
                style={animation}
              >
                <img src={images[index].image} />
                <p>{images[index].title}</p>
              </StyleRoot>
            </div>
            <Button {...{clickHandler,ignore}} type="right"/>
          </div>
          <div className="helpMenu__controlContainer">{balls}</div>
        </div>
        <p className="helpMenu__text">To get started press the <span>yellow button</span> with the city name on the map . You can also change the map size to make it more convenient to yourself .
        There is one more way to select a city . You can type the city name in input under the <span>Select city title</span> . If you want to have convenient access to certain cities on the map , you
        can use input and checkboxes under the <span>Select Regions on Map title</span> . You can either find city by region or find city by name . But only on the map . If you don`t want to waste time by
        selecting some cities every time this website reloads , you can use <span>Auto Select title</span>.</p>
      </div>
    </StyleRoot>
  );
};
export default CreateHelpMenu;
const Button=({clickHandler,type,ignore})=>{
  const [animation,setAnimation]=useState({});
  const onClick=()=>{
    if (ignore) return;
    clickHandler(type);
    setAnimation(animations.fadeOut);
    setTimeout(()=>{
      setAnimation(animations.appear);
    },500)
  }
  return (
    <StyleRoot className="helpMenu__arrow" style={animation}>
      <img src={type=="left" ? ArrowLeft : ArrowRight} onClick={onClick} />
    </StyleRoot>
  )
}