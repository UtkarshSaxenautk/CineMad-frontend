import React, { useContext, useEffect, useState } from "react";
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

function MoodForm() {
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
    const regex = /(happy|sad|depressed|cheerful|good|thrilling|adventurous|nostlagic|bad|anxious|stressed|overwhelmed|fear|suprise|disgust)/gi;
    const res = moods.match(regex);
    return res;
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
    let moods = extractMoods(formData.currentMood.toLowerCase());
    setUserMoods(moods);
    setCurrentMoods(moods)
    console.log("currentMoods", currentMoods);
    
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

  const renderForm = () => {
    return (
      <>
        {jwt == null || jwt === "" ? <><SessionExpired/></> :
          <>
            <ToastContainer />
            <div className="aling-top">
              <Nav />
            </div>
            <div>
              <br />
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Current Moods like:sad,happy,.."
                    name="currentMood"
                    variant="outlined"
                    value={formData.currentMood}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Favorite Actors:Keanu,Benedict,.."
                    name="favoriteActors"
                    variant="outlined"
                    value={formData.favoriteActors}
                    onChange={handleInputChange}
                  />
                </div>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>
            </div>
        
          </>
        }
        </>
    );
  };

  return (
    <div
      style={{
        backgroundImage:{image},
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "50px 0",
        
      }}
    >
      {formVisible ? (
        renderForm()
      ) : (
        <img
          src={image}
          alt="Background"
          onLoad={handleImageLoad}
          style={{ display: "none" }}
        />
      )}
    </div>
  );
}

export default MoodForm;
