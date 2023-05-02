import Result from "./Result";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SearchContext, TypeContext } from "../JwtContext";

 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Preloader from "./Preloader";

//var APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
//var SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
function Movie() {
  const [movies, setMovies] = useState([]);
  const { search, setSearch } = useContext(SearchContext)
  const { type, setType } = useContext(TypeContext)
  const [APIURL, setAPIURL ] = useState('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&adult=false')
  const [SEARCHAPI , setSEARCHAPI] = useState("https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&adult=false&api_key=04c35731a5ee918f014970082a0088b1&query=")
  //const {currentMoods , setCurrentMoods} = useContext(CurrentMoods)
//   const changeTheSearch = (event) => {
//     // console.log(event.target.value);
//     setSearch(event.target.value);
//   }
   
  
  
  const getAllMovies = () => {
    axios.get(APIURL)
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => {
          console.log(error)
          toast("error in getting movies from server please try again later")
        }
      )
  }

  const getSearchedMovies = () => {
    // console.log(SEARCHAPI + search)
    axios.get(
      SEARCHAPI + search
    )
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => { 
          console.log(error);
          toast("error in getting movies from server please try again later")
        }
      )
  }

  useEffect(() => {
    if (search === "") {
      getAllMovies();
    }
    else if (type === "everything" || search === "" || type === "") {
      setSEARCHAPI("https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&adult=false&api_key=04c35731a5ee918f014970082a0088b1&adult=false&query=");
      getSearchedMovies()
    } else if (type === "actor") {
      setSEARCHAPI("https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&adult=false&api_key=04c35731a5ee918f014970082a0088b1&adult=false&query=");
      getSearchedMovies()
      console.log(SEARCHAPI , "set ")
    }else {
      setSEARCHAPI("https://api.themoviedb.org/3/search/" + type + "?sort_by=popularity.desc&adult=false&api_key=04c35731a5ee918f014970082a0088b1&adult=false&query=");
      // console.log("Hello");
      getSearchedMovies()
      console.log(SEARCHAPI)
    }
  },[type , search])

  useEffect(
    () => {
      setMovies([]);
      if (search === "") {
        getAllMovies();
      } else {
        getSearchedMovies();
      }
       
      
    },
    [search]
  )

  return (
    <>
    <div className="max-w-[1240px] shadow-xl min-h-[200px] mx-auto p-3 ">
      {/* <input type="search" value={search} onChange={changeTheSearch} className="w-full border border-black rounded text-slate-700 p-4" /> */}
      {
        movies.length === 0
          ?
          <div className="text-3xl text-center mt-2"> <Preloader/> </div>
          :
          <Result movies={movies} />

      }
      
      </div>
      <ToastContainer/>
      </>
    
  );
}

export default Movie;
