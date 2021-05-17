import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { loadSeen, getSeen } from '../store/seen';
import { start, complete } from '../store/loadingBar';
import useIsUserAuth from '../hooks/useIsUserAuth';
import MovieList from '../components/MovieList';

export default function SeenPage({ match }) {
  const loadedMovies = useSelector(getSeen);
  const [movies, setMovies] = useState(loadedMovies);

  const dispatch = useDispatch();

  const { action } = useHistory();

  const username = match.params.username;
  const isUserAuth = useIsUserAuth(username);

  useEffect(() => {
    if(action === 'POP' && movies.length !== 0) return;

    dispatch(start());
    dispatch(loadSeen(username, true));
  }, []);

  useEffect(() => {
    setMovies(loadedMovies);
    dispatch(complete());
  }, [loadedMovies, dispatch]);

  if (movies.length === 0) return <div></div>;
  
  return <MovieList movies={movies} loadNext={() => dispatch(loadSeen(username))} cols={6} showButtons={isUserAuth} page="seen" />
}