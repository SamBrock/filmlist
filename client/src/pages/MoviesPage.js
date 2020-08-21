import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovies, getMovies } from '../store/movies';
import MovieItem from '../components/MovieItem'
import { getIsAuthenticated } from '../store/auth';
import { start, complete } from '../store/loadingBar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Movies() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(20);
  
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  useEffect(() => {
    if (isAuthenticated) dispatch(loadMovies(pageNumber, limit));
  }, [isAuthenticated, pageNumber])

  const movies = useSelector(getMovies);

  const isLoading = useSelector(state => state.entities.movies.loading);
  if (isLoading) {
    dispatch(start());
    return null;
  }

  document.title = `FILMLIST`
  dispatch(complete());
  return (
    <InfiniteScroll dataLength={movies.length} next={() => setPageNumber(page => page + 1)} hasMore={true} loader={<h4>Loading...</h4>} endMessage={<p style={{ textAlign: 'center' }}> <b>Yay! You have seen it all</b> </p>} >
      <div className="movies-container movies" data-router-view="movie">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} page="movies" />
        ))}
      </div>
    </InfiniteScroll>
  )
}