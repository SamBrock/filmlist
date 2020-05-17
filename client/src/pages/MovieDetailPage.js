import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails, addMovieToWatchlist } from '../store/movie';

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();

  const movieId = match.params.id;
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId])

  const movie = useSelector(getMovieDetails);
  console.log(movie);
  const handleClick = () => {
    dispatch(addMovieToWatchlist(movieId));
  }

  return (
    <div data-router-view="movie-page">
      <div class="backdrop-container">
        <img src={"https://image.tmdb.org/t/p/original/"+movie.backdrop_path}></img>
      </div>
    </div>
  )
}