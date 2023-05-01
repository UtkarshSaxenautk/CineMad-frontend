import Result from "./Result";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CurrentMoods, JwtContext, SearchContext, TypeContext } from "../JwtContext";
import ResultOne from "./Result1";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'


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


const SAMEAPIURL = 'http://localhost:50081/user/getMovieAccMood';
const OPPOMOODAPI = "http://localhost:50081/user/getMovieOppMood";
function MovieTwo() {
    const [sameMovies, setSameMovies] = useState([]);
    const [oppositeMovies, setOppositeMovies] = useState([]);
    const { currentMoods, setCurrentMoods } = useContext(CurrentMoods);
    const { jwt, setJwt } = useContext(JwtContext)
    const navigate = useNavigate()
//   const changeTheSearch = (event) => {
//     // console.log(event.target.value);
//     setSearch(event.target.value);
//   }
   
  useEffect(() => {
      if (jwt === "") {
        const temp = getCookie("jwt")
        setJwt(temp)
     }
     console.log(jwt, " : is jwt ")
  },[])
  
    const getMoviesAccordingToMood = () => {
        const body = {
            "jwt": jwt,
            "mood":currentMoods
      }
    axios.post(SAMEAPIURL , body)
      .then(
        (response) => {
          console.log(response.data)
          setSameMovies(response.data);
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  const getOppositeMovies = () => {
    // console.log(SEARCHAPI + search)
      const body = {
          "jwt": jwt,
          "mood":currentMoods,
      }
    axios.post(
      OPPOMOODAPI , body
    )
      .then(
        (response) => {
          console.log(response.data)
          setOppositeMovies(response.data);
        }
      )
      .catch(
        (error) => { 
          console.log(error);
        }
      )
  }

//   useEffect(() => {
//     if (search === "") {
//       getAllMovies();
//     }
//     else if (type === "everything" || search === "") {
//       setSEARCHAPI("https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=");
//       getSearchedMovies()
//     } else if (type === "actor") {
//       setSEARCHAPI("https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=");
//       getSearchedMovies()
//       console.log(SEARCHAPI , "set ")
//     }else {
//       setSEARCHAPI("https://api.themoviedb.org/3/search/" + type + "?&api_key=04c35731a5ee918f014970082a0088b1&query=");
//       // console.log("Hello");
//       getSearchedMovies()
//       console.log(SEARCHAPI)
//     }
//   },[type , search])

  useEffect(
    () => {
          setSameMovies([]);
          setOppositeMovies([]);
          getMoviesAccordingToMood();
          getOppositeMovies();
       
      
    },
    [currentMoods]
  )

    return (
        <>
            {jwt == null || jwt === "" ? <></> :
                <>
                    {
                        currentMoods == null || currentMoods.length === 0 ? <>
                            <div className="mt-8 justify-center align-middle">
                            <h1 className="text-3xl text-slate-300 text-center">
                                For personalized suggestions let us know your mood
                                </h1>
                                <p className="text-center mt-12">
                                    <button className=" text-3xl text-center justify-center border-x-4 border-y-4 rounded-2xl bg-slate-900 text-white pt-1 pb-1 px-1 py-1" onClick={() => { navigate('/moodtracker') }}>How you are Feeling!</button>
                                    </p>
                                </div>
                        </> :
                  <>  
            <div className="mt-4">
                
    <div className="max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3 ">
      {/* <input type="search" value={search} onChange={changeTheSearch} className="w-full border border-black rounded text-slate-700 p-4" /> */}
      <h2 className="text-center text-gray-200 text-2xl">Mood Emphasizer:  Let's Go According to your mood</h2>
                                        {
        sameMovies == null ||  sameMovies.length === 0
          ?
          <div className="text-3xl text-center mt-2"> Loading... </div>
      
          :
          <ResultOne movies={sameMovies} />

      }
      
                </div></div>
            <div className="mt-4">
                
                <div className="max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3 ">
      {/* <input type="search" value={search} onChange={changeTheSearch} className="w-full border border-black rounded text-slate-700 p-4" /> */}
      <h2 className="text-center text-gray-200 text-2xl">Mood Changer:  Let's Change your mood</h2>
                                        {
        oppositeMovies == null ||  oppositeMovies.length === 0
          ?
          <div className="text-3xl text-center mt-2"> Loading... </div>
          :
          <ResultOne movies={oppositeMovies} />

      }
      
                </div>
                                </div>
                                </>
                    }
                    </>
            
            }
            </>
    
  );
}

export default MovieTwo;
