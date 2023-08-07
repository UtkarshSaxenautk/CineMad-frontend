import Result from "./Result";
// here we are using axios to make api call which is npm package 
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
// using SearchContext and TypeContext to get value of searchedKeyword and Type of movie or series
import { SearchContext, TypeContext } from "../JwtContext";

// react-toast package for notification in app
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Preloader from "./Preloader";

//var APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
//var SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
function Movie() {
  const [movies, setMovies] = useState([]);
 // getting searched context from background using SearchContext
  const { search, setSearch } = useContext(SearchContext)
 //  getting type context from background using TypeContext
  const { type, setType } = useContext(TypeContext)
 // different apiUrls according to type of movie and series selected
  const [APIURL, setAPIURL] = useState('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&certification_country=IN&certification=PG-13&include_adult=false&vote_average.gte=6.0&api_key=04c35731a5ee918f014970082a0088b1&page=1&sort_by=popularity.desc&certification_country=US&certification.lte=PG-13&include_adult=false&vote_average.gte=6.0')
  const [APIURL2, setAPIURL2 ] = useState('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&certification_country=IN&certification=PG-13&include_adult=false&vote_average.gte=6.0&api_key=04c35731a5ee918f014970082a0088b1&page=2&sort_by=popularity.desc&certification_country=US&certification.lte=PG-13&include_adult=false&vote_average.gte=6.0')
  const [SEARCHAPI , setSEARCHAPI] = useState("https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=")
  //const {currentMoods , setCurrentMoods} = useContext(CurrentMoods)
//   const changeTheSearch = (event) => {
//     // console.log(event.target.value);
//     setSearch(event.target.value);
//   }
   
  
  // here we are using promise to get all movies of keyword
  const getAllMovies = () => {
    Promise.all([axios.get(APIURL), axios.get(APIURL2)])
  .then((responses) => {
    const arr1 = responses[0].data.results;
    const arr2 = responses[1].data.results;
    const allResults = arr1.concat(arr2);
    console.log("All results: ", allResults);
    setMovies(allResults);
  })
  .catch((error) => {
    console.log(error);
    toast("error in getting movies from server please try again later");
  });
    // axios.get(APIURL)
    //   .then(
    //     (response) => {
    //       console.log(response.data.results)
    //       setMovies(response.data.results);
    //     }
    //   )
    //   .catch(
    //     (error) => {
    //       console.log(error)
    //       toast("error in getting movies from server please try again later")
    //     }
    //   )
  }

 // get movies according to searched keyword with filters and  getting search from search Context  and setting movies as response from API
 // axios is used for api call 
  const getSearchedMovies = () => {
    // console.log(SEARCHAPI + search)
    axios.get(
      SEARCHAPI + search +"&include_adult=false&certification_country=US&certification=PG-13&language=en"
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

 // we are using useEffect with args type and search means, as the searched keyword in context changes or type changes useEffect will re-render component with 
 // new searched keyword

 // in this we are also using if-else to change the api according to type of movie or series selected?
  useEffect(() => {
    if (search === "") {
      getAllMovies();
    }
    else if (type === "everything" || search === "" || type === "") {
      setSEARCHAPI("https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=");
      getSearchedMovies()
    } else if (type === "actor") {
      setSEARCHAPI("https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=");
      getSearchedMovies()
      console.log(SEARCHAPI , "set ")
    }else {
      setSEARCHAPI("https://api.themoviedb.org/3/search/" + type + "?api_key=04c35731a5ee918f014970082a0088b1&query=");
      // console.log("Hello");
      getSearchedMovies()
      console.log(SEARCHAPI)
    }
  },[type , search])

 // using this useeffect to re-render movies after the chnage in search we get from search-context
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
      <h2 className="text-center mb-4  pb-5  text-amber-700 font-bold text-4xl">Trending Movies To Watch</h2>   
      {/* <input type="search" value={search} onChange={changeTheSearch} className="w-full border border-black rounded text-slate-700 p-4" /> */}
       {/* condition jsx checking if movies.length == 0 means no movies then show Preloader else pass value as prop in Result component */}
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
