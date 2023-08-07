import './App.css'
// here we will make state of jwt , search , type , userProfile and currentmoods to make Context Provider
import { useState } from "react";
// we are using react-router-dom for routing 
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home , signIn and different components
import Home from "./components/Home";
import SignIn from "./components/Login";
import SignUp from "./components/Signup";
// import different contexts from JwtContext file to make context or background value for these below fields
import { CurrentMoods, JwtContext, SearchContext, TypeContext, UserProfileContext } from "./JwtContext";
// import different components 
import Logout from "./components/Logout";
import ProfilePage from "./components/Profile";
import MoodForm from "./components/Main";
import WatchList from "./components/WatchList";
import Error500 from './components/500';
import Error400 from './components/400';
import MultipleInputs from './components/Form';
import GuidePage from './components/Guide';

export default function App(){
  // initially jwt , type and search set to empty string 
  const [jwt, setJwt] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  // userProfile to be null and currentMoods to be empty array
  const [userProfile, setUserProfile] = useState(null);
  const [currentMoods, setCurrentMoods] = useState([]);
  return (
    
      
    <BrowserRouter>
      {/* give states to context provider to update and access value of context*/
      <CurrentMoods.Provider value= {{currentMoods , setCurrentMoods}}>
      <JwtContext.Provider value={{ jwt, setJwt }}>
        
          <SearchContext.Provider value={{ search, setSearch }}> 
            <TypeContext.Provider value={{ type, setType }}>
            <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
              {/* different routes for pages we are using this to maintain context so that page doesn't refresh while navigate or going to other page*/}
            <Routes>
              {/* here route will take path = relative url and element as component to be rendered for path*/}
             <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/moodtracker" element={<MultipleInputs />} />
                  <Route path="/watch-list" element={<WatchList />} />
                  <Route path="/guide" element={<GuidePage />} />
                  <Route path="*" element={<Error400/>}/>
             </Routes> 
              
                </UserProfileContext.Provider>
              </TypeContext.Provider>
          </SearchContext.Provider>
          
        </JwtContext.Provider>
        </CurrentMoods.Provider>
        </BrowserRouter>
  
   
  );
}

