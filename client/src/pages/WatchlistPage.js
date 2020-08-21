import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadWatchlist, getWatchlist } from '../store/watchlist';
import MovieItem from '../components/MovieItem';
import { start, complete } from '../store/loadingBar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function WatchlistPage({ match }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(18);

  const dispatch = useDispatch();

  const username = match.params.username;
  useEffect(() => {
    dispatch(loadWatchlist(username, pageNumber, limit));
  }, [username, pageNumber])

  const movies = useSelector(getWatchlist);

  const isLoading = useSelector(state => state.entities.watchlist.loading);
  if (isLoading) {
    dispatch(start());
    return null;
  }

  document.title = `${username}'s Watchlist - FILMLIST`;
  dispatch(complete());
  return (
    <InfiniteScroll dataLength={movies.length} next={() => setPageNumber(page => page + 1)} >
      <div className="movies-container watchlist" data-router-view="movie">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} page="watchlist" />
        ))}
      </div>
    </InfiniteScroll>
  )
}