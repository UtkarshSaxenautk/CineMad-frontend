import React, { useContext , useEffect } from 'react'

// import Navigation from "./Navigation";
import Nav from './Nav';
import Foot from './Foot';
import { JwtContext } from '../JwtContext';
import Movie from './MovieView';
import MovieTwo from './MovieView2';
import SessionExpired from './SessionExpired';
import PopUpPage from './PopUp';


// function to get jwt which is saved in Cookie 
function getCookie(name) {
  const cookieString = decodeURIComponent(document.cookie);
  const cookies = cookieString.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}


const Home = () => {

  // jwt context is setted by getting it from cookie 
  const { jwt, setJwt } = useContext(JwtContext)
   
  console.log(jwt, " : is jwt initailly in home")
  var temp = getCookie("jwt")
  if(jwt === ""){
    setJwt(temp)
  }
  console.log(jwt, " : is jwt after in home")
  return (
    <div className='bg-gray-900'>
      {/* <Navigation /> */}
     
      <Nav />
      <PopUpPage />
      <div className='bg-gray-900'>
        {/* if jwt is null means user is not logged in then movies according to mood component MovieTwo will not be diplayed.*/}
         {
          jwt == null || jwt === "" ? <></>:<MovieTwo/>
         }
        {/* trending movies component which is visible to all */}
        <Movie />
       
        
        <Foot />
      </div>
       
     
      {/* <Footer /> */}
     
     
      </div>
  )
}

export default Home
