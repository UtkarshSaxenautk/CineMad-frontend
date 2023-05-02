import './App.css'
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Login";
import SignUp from "./components/Signup";
import { CurrentMoods, JwtContext, SearchContext, TypeContext, UserProfileContext } from "./JwtContext";
import Logout from "./components/Logout";
import ProfilePage from "./components/Profile";
import MoodForm from "./components/Main";
import WatchList from "./components/WatchList";
import Error500 from './components/500';
import Error400 from './components/400';
import MultipleInputs from './components/Form';

export default function App(){
  const [jwt, setJwt] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [currentMoods, setCurrentMoods] = useState([]);
  return (
    
      
    <BrowserRouter>
      <CurrentMoods.Provider value= {{currentMoods , setCurrentMoods}}>
      <JwtContext.Provider value={{ jwt, setJwt }}>
        
          <SearchContext.Provider value={{ search, setSearch }}> 
            <TypeContext.Provider value={{ type, setType }}>
            <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
            
            <Routes>
             <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/moodtracker" element={<MultipleInputs />} />
                  <Route path="/watch-list" element={<WatchList />} />
                  
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

