import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails } from '../store/movie';

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();
  
  const movieId = match.params.id;
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId])

  const movie = useSelector(getMovieDetails);
  console.log(movie);

  const handleClick = () => {
    console.log('clicked');
  }

  return (
    <div data-router-view="movie-page">
      <h1>{movie.title}</h1>
      <button onClick={() => handleClick()}>Add to watchlist</button>
    </div>
  )
}