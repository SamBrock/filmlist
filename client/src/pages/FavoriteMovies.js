import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { search, getSearchResults } from '../store/search';
import { motion } from 'framer-motion';
import MovieItem from '../components/MovieItem';
import AddFavoriteMovie from '../components/AddFavoriteMovie';
import { Link } from 'react-router-dom';
import { addMovieLike } from '../store/movie';

export default function FavoriteMovies() {
  const [favMovies, setFavMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState('');
  const [error, setError] = useState('');
  const [disableSearch, setDisableSearch] = useState(false);

  const dispatch = useDispatch()

  const movies = useSelector(getSearchResults);

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => {
      dispatch(search(query))
    }, 300));
  }, [query])

  useEffect(() => {
    if (favMovies.length > 3) {
      setDisableSearch(true);
      return;
    }

    setDisableSearch(false);
  }, [favMovies])

  const handleAdd = e => {
    if (favMovies.length > 3) return;

    const movieId = e.currentTarget.getAttribute('data-movie-id');
    const movie = movies.find(m => m.id === parseInt(movieId));


    if (favMovies.some(m => m.id === movie.id) || movie.poster_path === null) return;

    setFavMovies([...favMovies, movie]);
  }

  const handleDone = () => {
    favMovies.forEach(m => dispatch(addMovieLike(m.id)));
  }

  document.title = `Favorite Films - FILMLIST`;
  return (
    <div className="favorite-movies-container">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="search-form-container">
        <div className="search-form">
          <input type="text" name="search" placeholder="Search..." onKeyUp={(e) => setQuery(e.target.value)} disabled={disableSearch} />
        </div>
        <div className="search-results">
          {movies.map(movie => (
            <a data-movie-id={movie.id} onClick={(e) => handleAdd(e)}>
              <div className="result">
                <span className="movie-title">{movie.title}</span>
                <span className="movie-year">{movie.year}</span>
                <span className="movie-vote-average">{movie.vote_average}</span>
              </div>
            </a>
          ))}
        </div>
        {favMovies.length > 3 ? <div className="done-btn"><Link to={`/`} className="btn-primary" onClick={() => handleDone()}>Done</Link></div> : ''}
      </motion.div>
      <div className="favorite-movies-list-container">
        <div className="favorite-movies-list">
          <AddFavoriteMovie id={favMovies[0] ? favMovies[0].id : null} posterPath={favMovies[0] ? favMovies[0].poster_path : null} setFavMovies={setFavMovies} favMovies={favMovies} />
          <AddFavoriteMovie id={favMovies[1] ? favMovies[1].id : null} posterPath={favMovies[1] ? favMovies[1].poster_path : null} setFavMovies={setFavMovies} favMovies={favMovies} />
          <AddFavoriteMovie id={favMovies[2] ? favMovies[2].id : null} posterPath={favMovies[2] ? favMovies[2].poster_path : null} setFavMovies={setFavMovies} favMovies={favMovies} />
          <AddFavoriteMovie id={favMovies[3] ? favMovies[3].id : null} posterPath={favMovies[3] ? favMovies[3].poster_path : null} setFavMovies={setFavMovies} favMovies={favMovies} />
        </div>
      </div>
    </div>
  )
}
