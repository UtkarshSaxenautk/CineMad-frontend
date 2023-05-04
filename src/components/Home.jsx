import React, { useContext , useEffect } from 'react'

// import Navigation from "./Navigation";
import Nav from './Nav';
import Foot from './Foot';
import { JwtContext } from '../JwtContext';
import Movie from './MovieView';
import MovieTwo from './MovieView2';
import SessionExpired from './SessionExpired';
import PopUpPage from './PopUp';



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
         {
          jwt == null || jwt === "" ? <></>:<MovieTwo/>
         }
        <Movie />
       
        
        <Foot />
      </div>
       
     
      {/* <Footer /> */}
     
     
      </div>
  )
}

export default Home