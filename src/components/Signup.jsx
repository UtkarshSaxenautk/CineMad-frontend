/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import axios from "axios";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import {validate} from 'react-email-validator'
import SignIn from "./Login";
import Nav from "./Nav";

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
      email: "",
      username:"",
      password: "",
      confirmPassword: "",
      fullName: "",
    
  });

  const { email ,username ,password, confirmPassword , fullName } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(email)) {
      alert("Email is not valid");
      return 
    } 
    if (password.length <= 5) {
      alert("password must be of length greater than 5")
      return 
    }
      const data = {
        "email" : email,
    "username":username,
    "passwordHash":password,
    "fullName":fullName,
   
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
    const response = await axios.post("http://localhost:50081/authenticate/signup", data);
      console.log(response.data); // handle successful sign-up response here
      navigate('/')
  } catch (error) {
    console.log(error.response.data); // handle sign-up error response here
  }
  };

  return (
          <>
     {/* <Nav/> */}

<section className="h-full">
	<div className="leaves">
		<div className="set">
			<div><img src="https://i.imgur.com/Oc3aYTb.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png" referrerPolicy="no-referrer"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png" referrerPolicy="no-referrer"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png" referrerPolicy="no-referrer"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png" referrerPolicy="no-referrer"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png" referrerPolicy="no-referrer"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png" referrerPolicy="no-referrer"/></div>
      <div><img src="https://i.imgur.com/Oc3aYTb.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/sjEjxPI.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/Z0YR03s.png" referrerPolicy="no-referrer"/></div>
			<div><img src="https://i.imgur.com/fVYvICL.png" referrerPolicy="no-referrer"/></div>
		</div>
	</div>
	<img src="https://i.imgur.com/MosCSIH.png" referrerPolicy="no-referrer" className="bg"/>
	<img src="https://i.imgur.com/Q50tX3l.png" referrerPolicy="no-referrer" className="girl"/>
	<img src="https://i.imgur.com/J3FAXDV.png" referrerPolicy="no-referrer" className="girl1"/>
	<img src="https://i.imgur.com/DjVcJFA.png" referrerPolicy="no-referrer" className="bikerboy"/>
	<img src="https://i.imgur.com/tLXIflv.png" referrerPolicy="no-referrer" className="trees"/>
	<form onSubmit={handleSubmit} className="login">
		<h2>Sign Up</h2>
		<div className="inputBox ">
			<input type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required/>
                  </div>
        <div className="inputBox ">
		<input type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="UserName"
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
        <div className="inputBox">
		<input type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="ConfirmPassword"
          required/>
                  </div>
                  <div className="inputBox">
		<input type="text"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          placeholder="FullName"
          required/>
		</div>
		<div className="inputBox justify-center bg-white text-center h-7">
			 <button type="submit">Create</button>
		</div>
		<div className="text-center text-2xl">
			<a  href="#"> <button onClick={()=> {navigate('/login')}}> Sign In</button></a>
		</div>
	</form>
	
</section>

                </>
  );
};

export default SignUp;