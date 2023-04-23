/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { validate } from 'react-email-validator';
import { Cookies } from "react-cookie";
import './Login.css'
import { Link } from "@mui/material";
import SignUp from "./Signup";
import { JwtContext, UserProfileContext } from "../JwtContext";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";





const SignIn = () => {
  const navigate = useNavigate();
  const { jwt, setJwt } = useContext(JwtContext);
  const {userProfile , setUserProfile} = useContext(UserProfileContext)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const cookies = new Cookies();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!validate(email) ){
       alert("invalid email")
    }
    if (password.length <= 5) {
      alert("password must be more than 5 characters")
    }
    const data = {
          "email": email,
          "passwordHash": password
      }
      //console.log(jwt, " initially ");
    try {
       const response = await axios.post("http://localhost:50081/authenticate/signIn", data);
        console.log(response.data); // handle successful sign-up response here
        
        setJwt(response.data)
        
      

      // Store JWT in cookie
        const expirationTime = new Date(); // Set your desired expiration time here
expirationTime.setMinutes(expirationTime.getMinutes + 2400); // Example: expires in 30 minutes
      
// Set the cookie with the expiration time
      cookies.set("jwt", response.data, { path: "/", expires: expirationTime });
      console.log("Sign-in successful", response);
      navigate('/')
      
      // Handle successful sign-in response here
    } catch (error) {
      console.log(error); // Handle sign-in error response here
      alert("invalid email or password")
      return 
    }
  };

  useEffect(() => {
    // Check if JWT exists in cookie on page load
    const jwt = cookies.get("jwt");
    if (jwt) {
      console.log("User already signed in");
      // Handle already signed-in user here
    }
  }, []);

    return (
      <>
    {/* <Nav/> */}

<section>
	<div className="leaves">
		<div className="set">
			<div><img src="https://i.imgur.com/Oc3aYTb.png"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png"/></div>
		</div>
	</div>
	<img src="https://i.imgur.com/MosCSIH.png" className="bg"/>
	<img src="https://i.imgur.com/Q50tX3l.png" className="girl"/>
	<img src="https://i.imgur.com/J3FAXDV.png" className="girl1"/>
	<img src="https://i.imgur.com/DjVcJFA.png" className="bikerboy"/>
	<img src="https://i.imgur.com/tLXIflv.png" className="trees"/>
	<form onSubmit={handleSubmit} className="login">
		<h2>Sign In</h2>
		<div className="inputBox">
			<input type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required/>
		</div>
		<div className="inputBox">
			<input type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required/>
		</div>
		<div className="inputBox justify-center bg-white text-center h-7">
			 <button type="submit">Sign In</button>
		</div>
		<div className="group">
			<a href="#"> forget Password</a>
			<a href="/signup">Sign Up</a>
		</div>
	</form>
	
</section>

                </>
  );
};

export default SignIn;
