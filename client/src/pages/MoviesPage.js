import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { Redirect, useHistory } from 'react-router-dom';


import { loadMovies, getMovies, loadDefaultMovies,  } from '../store/movies';
import { getIsAuthenticated } from '../store/auth';
import { start, complete } from '../store/loadingBar';
import { getMoviesError } from '../store/error';
import { transition } from '../transitions';
import MovieList from '../components/MovieList';

export default function Movies() {  
  const loadedMovies = useSelector(getMovies);
  const [movies, setMovies] = useState(loadedMovies);

  const dispatch = useDispatch();

  const { action } = useHistory();

  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if(isAuthenticated === null) return;
    if(action === 'POP' && movies.length !== 0) return;
    
    dispatch(start());
    isAuthenticated ? dispatch(loadMovies()) : dispatch(loadDefaultMovies())
  }, [isAuthenticated, dispatch]);
  
  
  useEffect(() => {
    setMovies(loadedMovies);
    dispatch(complete());
  }, [loadedMovies, dispatch]);

  const moviesError = useSelector(getMoviesError);
  
  if (moviesError) { return <motion.div exit={{ opacity: 0 }} transition={transition}><Redirect to={`/favorite-films`} /></motion.div> }

  return <MovieList movies={movies} loadNext={() => dispatch(loadMovies(!isAuthenticated))} page="movies" />
}