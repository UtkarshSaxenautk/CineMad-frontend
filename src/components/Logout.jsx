import React, { useState , useEffect } from "react";
import { useContext } from "react";
import { Cookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import { JwtContext } from "../JwtContext";


const deleteJwtCookie = () => {
  document.cookie = "jwt=;path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
}




const Logout = () => {
  const cookies = new Cookies()
  const { jwt, setJwt } = useContext(JwtContext)
  //const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [redirectCounter, setRedirectCounter] = useState(0);

  useEffect(() => {
    let intervalId;
    if (redirectCounter > 0) {
      intervalId = setInterval(() => {
        setRedirectCounter(redirectCounter - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [redirectCounter]);
  
  // useEffect(() => {
  //   if (redirectCounter === 0) {
  //     // Redirect to logout page or perform logout logic here
  //     window.location.href = '/'; // Uncomment this line to actually perform the redirect
       
  //   }
  // }, [redirectCounter]);

   
  const handleLogoutClick = () => {
    deleteJwtCookie()
    cookies.remove("jwt")
    setJwt(null);
    setRedirectCounter(7);
    setTimeout(() => {
      navigate('/')
    },7000)
  };
  useEffect(() => {
    handleLogoutClick(); // Call handleLogoutClick as soon as the component is loaded
  }, []);


  
  // const handleLogout = () => {
  //   deleteJwtCookie()
  //   cookies.remove("jwt")
  //   setJwt(null);
  //   setTimeout(() => {
  //    setTime(time) 
  //   navigate("/");
  //   }, 7000);
  // };

  const handleBack = () => {
    navigate('/login')
  }

  return (
    <div>
    <div className="text-center flex justify-center mt-20 ">
      Thank you For Your Support 
      Your session is completed
      {redirectCounter > 0 && (
        <p>Redirecting in {redirectCounter} seconds...</p>
      )}
      </div>
      <br />
      <br />
      <p className="text-center text-2xl">Again want to Login:--- 
        <button className="text-center mt-4 border-x-2 border-y-2 border-black" onClick={handleBack}> Login </button>
      </p>

      
      
      
      </div>
  );
};

export default Logout;
