import { render } from "react-dom";
import './style.css'
import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Login";
import SignUp from "./components/Signup";
import { JwtContext, SearchContext, TypeContext, UserProfileContext } from "./JwtContext";
import Nav from "./components/Nav";
import Logout from "./components/Logout";
import { Profiler } from "react";
import ProfilePage from "./components/Profile";




const App = () => {
  const [jwt, setJwt] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  return (
    <StrictMode>
      
        <BrowserRouter>
        <JwtContext.Provider value={{ jwt, setJwt }}>
          <SearchContext.Provider value={{ search, setSearch }}> 
            <TypeContext.Provider value={{ type, setType }}>
              <UserProfileContext.Provider value={{userProfile , setUserProfile}}>
          <Routes>
            {/* <Route path="/details/:id" element={<Details />} /> */}
            <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<ProfilePage />}/>
                </Routes> 
                </UserProfileContext.Provider>
              </TypeContext.Provider>
            </SearchContext.Provider>
          </JwtContext.Provider>
        </BrowserRouter>
  
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));