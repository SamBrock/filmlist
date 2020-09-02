import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadWatchlist, getWatchlist, loading, moreLoading } from '../store/watchlist';
import MovieItem from '../components/MovieItem';
import { start, complete } from '../store/loadingBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import useIsUserAuth from '../hooks/useIsUserAuth';
import { motion } from 'framer-motion';
import { transition } from '../transitions/transitions';

export default function WatchlistPage({ match }) {
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 18;

  const dispatch = useDispatch();

  const username = match.params.username;
  useEffect(() => {
    dispatch(loadWatchlist(username, pageNumber, limit));
  }, [username, pageNumber, dispatch])

  const movies = useSelector(getWatchlist);

  const isMoreLoading = useSelector(moreLoading);

  const isUserAuth = useIsUserAuth(username);

  const isLoading = useSelector(loading);
  if (isLoading) {
    dispatch(start());
    return null;
  }

  document.title = `${username}'s Watchlist - FILMLIST`;
  dispatch(complete());

  if (movies.length <= 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition} className="empty-msg">
        Your watchlist is empty.
      </motion.div>
    )
  }
  return (
    <motion.div exit={{ opacity: 0 }} transition={transition}>
      <InfiniteScroll dataLength={movies.length} next={() => setPageNumber(page => page + 1)} hasMore={true}>
        <div className="movies-container watchlist" data-router-view="movie">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} page="watchlist" isUserAuth={isUserAuth} />
          ))}
        </div>
      </InfiniteScroll>
      <div style={isMoreLoading ? {} : { display: 'none' }} className="load-more-container" >
        <div className="load-more-animation">
          <div className="load-more-bar"></div>
        </div>
      </div>
    </motion.div>
  )
}