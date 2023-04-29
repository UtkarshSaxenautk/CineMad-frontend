import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, CircularProgress } from '@mui/material';
import { Delete } from '@mui/icons-material';

const WatchList = ({ movies, onRemoveMovie }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1');
      const data = await response.json();
      setMovieData(data.results);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMovieRemove = () => {
    onRemoveMovie(selectedMovie);
    setSelectedMovie(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Watch List</h2>
      <List className="w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden divide-y divide-gray-200">
        {movieData.map((movie) => (
          <ListItem button key={movie.id} onClick={() => handleMovieClick(movie)}>
            <ListItemAvatar>
              <Avatar className="w-12 h-12" alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            </ListItemAvatar>
            <ListItemText primary={movie.title} secondary={movie.release_date} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onRemoveMovie(movie)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {selectedMovie && (
        <div>
          <p className="mt-4">Selected Movie: {selectedMovie.title}</p>
          <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleMovieRemove}>Remove</button>
          <div className="mt-4">
            <img className="w-64 h-64 object-cover rounded-lg" src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchList;
