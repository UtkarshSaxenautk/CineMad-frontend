import React from "react";
import { TextField, Button } from "@mui/material";
import image from '../images/404.png'
import { useContext } from "react";
import { JwtContext } from "../JwtContext";
import axios from "axios";
import { useEffect } from "react";

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
  const {jwt , setJwt} = useContext(JwtContext)
  const [formData, setFormData] = React.useState({
    currentMood: "",
    favoriteActors: "",
  });

  const [formVisible, setFormVisible] = React.useState(false);

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
  }

  useEffect(() => {
    if (jwt === "" || jwt === null) {
      const temp = getCookie("jwt");
      setJwt(temp);
    }
  },[])

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    console.log(formData);
    const moods = extractMoods(formData.currentMood.toLowerCase())
    console.log(moods)
    const tempJwt = getCookie("jwt");
    
    if (jwt === "" || jwt == null) {
      setJwt(tempJwt);
    }
    console.log(jwt);
    const data = {
          "jwt": jwt,
          "mood": moods
      }
      //console.log(jwt, " initially ");
    try {
       const response = await axios.post("http://localhost:50081/user/getMovieAccMood", data);
        console.log(response.data); 
    } catch (error) {
      console.log(error); 
      return 
    }
  };

  const handleImageLoad = () => {
    setFormVisible(true);
  };

  const renderForm = () => {
    return (
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
