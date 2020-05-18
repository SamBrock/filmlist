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
    dispatch(addMovieToWatchlist(movieId)); //
  }

 

  return (
    <div data-router-view="movie-page" className="movie-page-container">
      <div className="backdrop-container">
        <img src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}></img>
      </div>
      <div className="movie-container">
        <div className="movie-title">
          <h1>{movie.title}</h1>
        </div>
        <div className="movie-info">
          <span>{new Date(movie.release_date).getFullYear()}</span><span>|</span>
          <span>{movie.runtime}</span><span>|</span>
          <span>R</span>
        </div>
        <div className="movie-overview">
          {movie.overview}
        </div>
        <div className="movie-crew">
          <div className="movie-sub-heading">
            <h3>Crew</h3>
          </div>

        </div>
      </div>
    </div>
  )
}