import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails, addMovieToWatchlist } from '../store/movie';
import { start, complete } from '../store/loadingBar';

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();

  const movieId = match.params.id;
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId])

  const movie = useSelector(getMovieDetails);

  const handleClick = () => {
    dispatch(addMovieToWatchlist(movieId)); //
  }

  const isLoading = useSelector(state => state.entities.movie.loading);

  if (isLoading) {
    dispatch(start({progress: 10}));
    return null;
  } else {
    dispatch(complete());
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

}