import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { Redirect, useHistory } from 'react-router-dom';

import { transitions } from '../config';
import { loadMovies, getMovies, loadDefaultMovies, loading } from '../store/movies';
import { getIsAuthenticated } from '../store/auth';
import { start, complete } from '../store/loadingBar';
import { getMoviesError } from '../store/error';
import MovieList from '../components/MovieList';
import MovieItem from '../components/MovieItem';
import Head from '../components/Head';

export default function Movies() {
  const { action } = useHistory();

  const loadedMovies = useSelector(getMovies);
  const [movies, setMovies] = useState(loadedMovies);

  const dispatch = useDispatch();

  const moviesLoading = useSelector(loading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const moviesError = useSelector(getMoviesError);

  useEffect(() => {
    if (isAuthenticated === null) return;
    if (action === 'POP' && movies.length !== 0) return;

    dispatch(start());
    isAuthenticated ? dispatch(loadMovies()) : dispatch(loadDefaultMovies())
  }, [isAuthenticated]);

  useEffect(() => {
    setMovies(loadedMovies);
    dispatch(complete());
  }, [loadedMovies, dispatch]);

  if (moviesError) { return <motion.div exit={{ opacity: 0 }} transition={transitions.default}><Redirect to={`/favorite-films`} /></motion.div> }

  return (
    <>
      <Head bodyAttributes={movies.length === 0 ? 'overflow-y-hidden' : ''} />
      <MovieList length={movies.length} loadNext={() => isAuthenticated ? dispatch(loadMovies()) : dispatch(loadDefaultMovies())} loading={moviesLoading}>
        {movies.map((movie, i) => <MovieItem key={movie.id} movie={movie} page="movies" index={i} />)}
      </MovieList>
    </>
  )
}