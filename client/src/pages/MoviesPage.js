import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovies, getMovies, loading, moreLoading } from '../store/movies';
import MovieItem from '../components/MovieItem'
import { getIsAuthenticated } from '../store/auth';
import { start, complete } from '../store/loadingBar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Movies() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  useEffect(() => {
    if (isAuthenticated) dispatch(loadMovies(pageNumber, limit));
  }, [isAuthenticated, pageNumber])

  const movies = useSelector(getMovies);

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
    return null;
  }

  document.title = `FILMLIST`
  dispatch(complete());
  return (
    <main>
      <InfiniteScroll dataLength={movies.length} next={() => setPageNumber(page => page + 1)} hasMore={hasMore} >
        <div className="movies-container movies" data-router-view="movie">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} page="movies" isUserAuth={true}/>
          ))}
        </div>
      </InfiniteScroll>
      <div className="load-more-container" >
        <a className="load-more-btn btn-primary" style={hasMore ? { display: 'none' } : {}} onClick={() => setHasMore(true)}>Load more films</a>
        <div style={isMoreLoading ? {} : { display: 'none' }} className="load-more-animation">
          <div className="load-more-bar"></div>
        </div>
      </div>
    </main>
  )
}