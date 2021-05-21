import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { loadSeen, getSeen, loading } from '../store/seen';
import { start, complete } from '../store/loadingBar';
import useIsUserAuth from '../hooks/useIsUserAuth';
import MovieList from '../components/MovieList';
import MovieItem from '../components/MovieItem';
import Head from '../components/Head';;

export default function SeenPage({ match }) {
  const { action } = useHistory();

  const loadedMovies = useSelector(getSeen);
  const [movies, setMovies] = useState(action === 'POP' ? loadedMovies : []);

  const dispatch = useDispatch();

  const seenLoading = useSelector(loading);

  const username = match.params.username;
  const isUserAuth = useIsUserAuth(username);

  useEffect(() => {
    if (action === 'POP' && movies.length !== 0) return;

    dispatch(start());
    dispatch(loadSeen(username, true));
  }, []);

  useEffect(() => {
    setMovies(loadedMovies);
    dispatch(complete());
  }, [loadedMovies, dispatch]);

  const handleLoadMore = () => {
    if (!seenLoading) dispatch(loadSeen(username));
  }

  return (
    <>
      <Head title={`${username}'s Seen`} />
      <MovieList length={movies.length} loadNext={handleLoadMore} cols={6} loading={seenLoading} >
        {movies.map((movie, i) => <MovieItem key={movie.id} movie={movie} page="seen" showButtons={isUserAuth} index={i} />)}
      </MovieList>
    </>
  )
}