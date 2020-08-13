import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovies, getMovies } from '../store/movies';
import MovieItem from '../components/MovieItem'
import { getIsAuthenticated } from '../store/auth';
import { start, complete } from '../store/loadingBar';

export default function Movies() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) dispatch(loadMovies());
  }, [isAuthenticated])

  const movies = useSelector(getMovies);

  const isLoading = useSelector(state => state.entities.movies.loading);

  if (isLoading) {
    dispatch(start());
    return null;
  }
  
  document.title = `FILMLIST`
  dispatch(complete());
  return (
    <div className="movies-container movies" data-router-view="movie">
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} page="movies"/>
      ))}
    </div>
  )
}