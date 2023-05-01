import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, CircularProgress, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { useContext } from 'react';
import { JwtContext } from '../JwtContext';
import Nav from './Nav';
import SessionExpired from './SessionExpired';



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
    return <CircularProgress />;
  }

  const removeSpace = (s) => {
    const url = "https://www.google.com/search?q="+s;
    return url
  }

  return (
    <>
      <Nav />
    <div className='flex  bg-auto  justify-center items-center" bg-slate-400 '>
      
    <div>
          <h2 className="text-xl text-center font-bold mt-3 mb-6">Watch List</h2>
          {jwt == null || jwt === "" ? <><SessionExpired/></> :
            <List className="content-center w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden divide-y divide-gray-200">
              {movieData.map((movie) => (
                <ListItem button key={movie.ID}>
                  <ListItemAvatar>
                    <Avatar className="w-12 h-12" alt={movie.Name} src={`${movie.ImageUrl}`} />
                  </ListItemAvatar>
                  <ListItemText primary={movie.Name} secondary={movie.release_date} />
                  <a href={removeSpace(movie.Name)}><Button>Watch</Button></a>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleRemoveMovie(movie)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
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

      </>
  );
};

export default WatchList;
