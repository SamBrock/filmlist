import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails } from '../store/movie';
import { start, complete } from '../store/loadingBar';
import MovieButtons from '../components/MovieButtons';
import Carousel from '../components/layout/Carousel';

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();

  const movieId = parseInt(match.params.id);
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId])

  const movie = useSelector(getMovieDetails);

  const isLoading = useSelector(state => state.entities.movie.loading);

  if (isLoading) {
    dispatch(start());
    return null;
  }

  document.title = `${movie.title} (${movie.year}) • FILMLIST`
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
          <span>{movie.year}</span>
          <span>{movie.runtime}</span>
          <span>R</span>
        </div>
        <MovieButtons filmId={movie.id}/>
        <div className="movie-overview">
          {movie.overview}
        </div>
        <div className="movie-genres">
          {movie.genres.map(genre => <span className="movie-genre">{genre.name}</span>)}
        </div>
        <div className="movie-credits">
          <h3>Crew</h3>
          <div className="movie-credits-list">
            {movie.credits.crew.map(member => (
              <div className="movie-credit movie-crew">
                <div className="movie-credit-name">{member.name}</div>
                <div className="movie-credit-role">{member.job}</div>
              </div>
            ))}
          </div>
        </div>
        <Carousel cast={movie.credits.cast} />
      </div>
    </div>
  )
}