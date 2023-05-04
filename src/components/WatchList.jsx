import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, CircularProgress, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { JwtContext } from '../JwtContext';
import Nav from './Nav';
import SessionExpired from './SessionExpired';
import './WatchList.css'
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';



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

const WatchList = ({ movies, onRemoveMovie }) => {
 const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const { jwt, setJwt } = useContext(JwtContext);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const temp = getCookie('jwt');
      if (jwt === '') {
        setJwt(temp);
      }
      const body = {
        jwt: temp,
      };
      try {
        const res = await axios.post('http://localhost:50081/user/getWatchLater', body);
        setMovieData(res.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  
  const handleRemoveMovie = async(movie) =>  {
    const body = {
      "jwt" : jwt,
      "movie_id": movie.ID,
    };
    try {
      const res = await axios.post('http://localhost:50081/user/deleteWatchLater', body);
      console.log(res);
      setMovieData((prevData) => prevData.filter((data) => data.ID !== movie.ID));
      setSelectedMovie(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  const removeSpace = (s) => {
    const url = "https://www.justwatch.com/in/search?q="+s;
    return url
  }

  return (
    <>
      <div className='bg-slate-800 bg-auto h-full '>
      <Nav />
    <div className='flex    justify-center items-center backdrop-blur-sm" '>
      
    <div className='backdrop-blur-sm'>
          {/* <h2 className="text-3xl text-center font-bold mt-3 mb-6 backdrop-blur-sm  text-amber-700">Watch List</h2> */}
          {jwt == null || jwt === "" ? <><SessionExpired/></> :
            // <List className="content-center w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden divide-y divide-gray-200">
            //   {movieData.map((movie) => (
            //     <ListItem button key={movie.ID}>
            //       <ListItemAvatar>
            //         <Avatar className="" alt={movie.Name} src={`${movie.ImageUrl}`} />
            //       </ListItemAvatar>
            //       <ListItemText primary={movie.Name} secondary={movie.release_date} />
            //       <a href={removeSpace(movie.Name)}><Button>Watch</Button></a>
            //       <ListItemSecondaryAction>
            //         <IconButton onClick={() => handleRemoveMovie(movie)}>
            //           <Delete />
            //         </IconButton>
            //       </ListItemSecondaryAction>
            //     </ListItem>
            //   ))}
            // </List>
              <div className="container my-12 mx-auto px-4 md:px-12">
         <div className="flex flex-wrap -mx-1 lg:-mx-4">
                  {movieData.map((movie) => (
          
                    <div key={movie.ID} className="my-1 px-1 w-full md:w-1/5 lg:my-4 lg:px-4 lg:w-1/6 ">

          
                      <article className="overflow-hidden rounded-lg shadow-lg">

                        <a href="#">
                          <img alt={movie.Name} className="block h-auto w-full" src={`${movie.ImageUrl}`} />
                        </a>

                        <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                          <h1 className="text-lg">
                            <a className="no-underline hover:underline text-white text-ellipsis truncate overflow-visible ... " href="#">
                              {movie.Name}
                            </a>
                          </h1>
                          <p className="text-grey-darkertext-sm">
                            {movie.OverView}
                          </p>
                        </div>

                        <div className="flex items-center justify-between leading-none p-2 md:p-4">
                          <a className="flex items-center no-underline hover:underline text-white" href="#">
                            <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random"/>
                              <p className="ml-2 text-sm text-white">
                                 <a className='text-white ' style={{color:'white'}} href={removeSpace(movie.Name)} target='_blank' rel="noreferrer"><button  className='text-white'>Watch</button></a>
                              </p>
                          </a>
                          <a className="no-underline " href="#">
                            <IconButton sx={{color:"white"}} onClick={() => handleRemoveMovie(movie)}>
                      <Delete />
                     </IconButton>
                          </a>
                        </div>

                      </article>
          

                    </div>
     ))}

    </div>
</div>
          }
      {/* {selectedMovie && (
        <div>
          <p className="mt-4">Selected Movie: {selectedMovie.title}</p>
          <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleRemoveMovie()}>Remove</button>
          <div className="mt-4">
            <img className="w-64 h-64 object-cover rounded-lg" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
          </div>
        </div>
      )} */}
    
        </div>
    
      </div>
   </div>
      </>
  );
};

export default WatchList;
