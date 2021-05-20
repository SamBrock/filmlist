import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { loadWatchlist, getWatchlist } from '../store/watchlist';
import { start, complete } from '../store/loadingBar';
import useIsUserAuth from '../hooks/useIsUserAuth';
import MovieList from '../components/MovieList';
import MovieItem from '../components/MovieItem';
import Head from '../components/Head';

export default function WatchlistPage({ match }) {
  const loadedMovies = useSelector(getWatchlist);
  const [movies, setMovies] = useState(loadedMovies);

  const dispatch = useDispatch();

  const username = match.params.username;
  const isUserAuth = useIsUserAuth(username);

  const { action } = useHistory();

  useEffect(() => {
    if (action === 'POP' && movies.length !== 0) return;

    dispatch(start());
    dispatch(loadWatchlist(username, true));
  }, [username, action]);

  useEffect(() => {
    setMovies(loadedMovies);
    dispatch(complete());
  }, [loadedMovies]);

  return (
    <>
    <Head title={`${username}'s Watchlist`} />
      <MovieList movies={movies} loadNext={() => dispatch(loadWatchlist(username))} cols={6} >
        {movies.map((movie, i) => <MovieItem key={movie.id} movie={movie} page="watchlist" showButtons={isUserAuth} />)}
      </MovieList>
    </>
  )
}