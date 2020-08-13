import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadWatchlist, getWatchlist } from '../store/watchlist';
import MovieItem from '../components/MovieItem';
import { start, complete } from '../store/loadingBar';

export default function WatchlistPage({ match }) {
  const dispatch = useDispatch();

  const username = match.params.username;
  useEffect(() => {
    dispatch(loadWatchlist(username))
  }, [username])

  const movies = useSelector(getWatchlist);

  const isLoading = useSelector(state => state.entities.watchlist.loading);
  if (isLoading) {
    dispatch(start());
    return null;
  }

  console.log(movies);

  dispatch(complete());
  return (
      <div className="movies-container watchlist" data-router-view="movie">
        {movies.map((movie) => (
          <MovieItem key={movie.movie.id} movie={movie.movie} page="watchlist" />
        ))}
      </div>
  )
}