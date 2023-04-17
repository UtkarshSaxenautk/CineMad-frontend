import { render } from "react-dom";
import './style.css'
import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Login";
import SignUp from "./components/Signup";
import { JwtContext } from "./JwtContext";
import Nav from "./components/Nav";
import Logout from "./components/Logout";




const App = () => {
  const [jwt, setJwt] = useState('');
  return (
    <StrictMode>
      
        <BrowserRouter>
        <JwtContext.Provider value={{ jwt, setJwt }}>
         
          <Routes>
            {/* <Route path="/details/:id" element={<Details />} /> */}
            <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
          </Routes> 
          </JwtContext.Provider>
        </BrowserRouter>
  
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));