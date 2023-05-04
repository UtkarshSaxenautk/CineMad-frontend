import React, { useState , useContext , useEffect } from "react";
import "./Form.css";
import { TextField, Button } from "@mui/material";
import image from "../images/404.png";
import axios from "axios";
import { CurrentMoods, JwtContext } from "../JwtContext";
import Nav from "./Nav";
import { useNavigate } from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import SessionExpired from "./SessionExpired";

function getCookie(name) {
  const cookieString = decodeURIComponent(document.cookie);
  const cookies = cookieString.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

const MultipleInputs = () => {
    const navigate = useNavigate()
  const { currentMoods, setCurrentMoods } = useContext(CurrentMoods);
  const { jwt, setJwt } = useContext(JwtContext);
  const [userMoods, setUserMoods] = useState([]);
  const [formData, setFormData] = useState({
    currentMood: "",
    favoriteActors: "",
  });
  const [formVisible, setFormVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const extractMoods = (moods) => {
    const regex = /(happy|sad|depressed|cheerful|good|thrilling|adventurous|nostlagic|bad|anxious|stressed|overwhelmed|fear|surprise|suprise|disgust|depress|feelinggood|joy|cheering|loving|relax|delighted|pleased|glad|satisfied|thankful|joyful|joyous|blissful|unhappy|heartbroken|misery|miserable|sorry|upset|worried|disappointed|hopeless|suicidal|discouraged|dark|low|regret|friendzone|ugly|horrible|awful|shocking|hideous|sickening|anxiety|fearfulness|panic|terror|fright|worry|horror|scared|rage|fury|wrath|irritation|irritated|temper|mad|envy|motivated)/gi;
  const res = moods.match(regex);
  return res;
    // const regex = /(happy|sad|depressed|cheerful|good|thrilling|adventurous|nostlagic|bad|anxious|stressed|overwhelmed|fear|suprise|disgust|depress|feelinggood|joy|cheering|loving|relax|delighted|pleased|glad|satisfied|thankful|joyful|joyous|blissful|unhappy|heartbroken|misery|miserable|sorry|upset|worried|disappointed|hopeless|suicidal|discouraged|dark|low|regret|friendzone|ugly|horrible|awful|shocking|hideous|sickening|anxiety|fearfulness|panic|terror|fright|worry|horror|scared|rage|fury|wrath|irritation|irritated|temper|mad|envy) /gi;
    // const res = moods.match(regex);
    // return res;
  };

  useEffect(() => {
    if (jwt === "" || jwt === null) {
      const temp = getCookie("jwt");
      setJwt(temp);
    }
  }, []);



  useEffect(() => {
    console.log("userMoods updated:", userMoods);
    setCurrentMoods(userMoods);
    console.log("currentMoods", currentMoods);
  }, [userMoods]);
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData.currentMood == "" && formData.favoriteActors == "") {
      toast("please fill one of following input fields")
      return 
    }
    const gotString = formData.currentMood.trim()
    console.log(gotString)
    let moods = extractMoods(gotString.toLowerCase());
    setUserMoods(moods);
    setCurrentMoods(moods)
    console.log("extracted moods", moods);
    
    const tempJwt = getCookie("jwt");

    if (jwt === "" || jwt == null) {
      setJwt(tempJwt);
    }

    console.log(jwt);
    const data = {
      jwt: jwt,
      mood: moods,
    };
    try {
      const response = await axios.post(
        "http://localhost:50081/user/getMovieAccMood",
        data
      );
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast("having some internal issue try after sometime")
      return;
    }
  };

  const handleImageLoad = () => {
    setFormVisible(true);
  };

  return (
    <>
        <Nav/>
          {jwt == null || jwt === "" ? <><SessionExpired  /></> :
              <div className="aling-top">
                  <ToastContainer />
                  <div className="full-screen-container"> 
                      <div className="login-container">
                          <h3 className="login-title">Let Us Know Your mood</h3>
                          <form onSubmit={handleFormSubmit}>
                              <div className="input-group  px-6 ">
                                  <TextField
                                      fullWidth
                                      label="Current Moods like:sad,happy,.."
                                      name="currentMood"
                                      variant="outlined"
                                      value={formData.currentMood}
                                      onChange={handleInputChange}
                                      sx={{padding:6}}
                                  />
                              </div>
                              <div className="input-group  px-6 ">
                                  <TextField
                                      fullWidth
                                      label="Favorite Actors:Keanu,Roman,.."
                                      name="favoriteActors"
                                      variant="outlined"
                                      value={formData.favoriteActors}
                                      onChange={handleInputChange}
                                      sx={{padding:6}}
                                  />
                              </div>
                              <button type="submit" className="login-button">Submit</button>
                          </form>
                      </div>
                  </div>
              </div>
          }
          </>
  );
};

export default MultipleInputs;