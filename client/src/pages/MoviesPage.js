import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovies, loadDefaultMovies, getMovies, loading, moreLoading } from '../store/movies';
import MovieItem from '../components/MovieItem'
import { getIsAuthenticated } from '../store/auth';
import { start, complete } from '../store/loadingBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import { getMoviesError } from '../store/error';
import { transition } from '../transitions/transitions';
import _ from 'lodash';

export default function Movies() {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);
  const limit = 20;

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) dispatch(loadMovies(pageNumber, limit));
    if (isAuthenticated === false) dispatch(loadDefaultMovies());
  }, [isAuthenticated, pageNumber, dispatch])

  const movies = useSelector(getMovies);
  const uniqueMovies = _.uniqBy(movies, 'id');

  const moviesError = useSelector(getMoviesError);

  useEffect(() => {
    setCount(count => count + movies.length);
    if (count > 60) {
      setHasMore(false);
      setCount(0);
    }
  }, [movies])

  const isMoreLoading = useSelector(moreLoading);

  const isLoading = useSelector(loading);
  if (isLoading) {
    dispatch(start());
    return (
      <div></div>
    );
  }

  document.title = `FILMLIST`
  dispatch(complete());

  if (moviesError) { return <motion.div exit={{ opacity: 0 }} transition={transition}><Redirect to={`/favorite-films`} /></motion.div> }
  if (isAuthenticated) {
    return (
      <motion.div exit={{ opacity: 0 }} transition={transition} >
        <InfiniteScroll dataLength={movies.length} next={() => setPageNumber(page => page + 1)} hasMore={hasMore} >
          <div className="movies-container movies" data-router-view="movie">
            {uniqueMovies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} page="movies" isUserAuth={true} />
            ))}
          </div>
        </InfiniteScroll>
        <div className="load-more-container" >
          <a className="load-more-btn btn-primary" style={hasMore ? { display: 'none' } : {}} onClick={() => setHasMore(true)}>Load more films</a>
          <div style={isMoreLoading ? {} : { display: 'none' }} className="load-more-animation">
            <div className="load-more-bar"></div>
          </div>
        </div>
      </motion.div>
    )
  } else {
    return (
      <main>
        <motion.div exit={{ opacity: 0 }} className="movies-container movies" data-router-view="movie">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} page="movies" isUserAuth={false} />
          ))}
        </motion.div>
      </main>
    )
  }
}