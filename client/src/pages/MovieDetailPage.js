import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails, loading } from '../store/movie';
import { start, complete } from '../store/loadingBar';
import MovieButtons from '../components/MovieButtons';
import Carousel from '../components/layout/Carousel';
import { motion } from 'framer-motion';
import BackdropImg from '../components/layout/BackdropImg';
import { getIsAuthenticated } from '../store/auth';
import { Link } from 'react-router-dom';
import { movieDetailsVariant, movieDetailsChildren } from '../transitions/transitions'

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);

  const movieId = parseInt(match.params.id);
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId])

  const movie = useSelector(getMovieDetails);

  const isLoading = useSelector(loading);


  if (isLoading) {
    dispatch(start());
    return null;
  }

  document.title = `${movie.title} (${movie.year}) - FILMLIST`
  dispatch(complete());
  return (
    <motion.div exit={{ opacity: 1 }} className="grid-page-container">
      <BackdropImg backdropPath={movie.backdrop_path} />
      <div className="movie-details-container grid-2-col-backdrop">
        <div id="backdrop-placeholder"></div>
        <motion.div variants={movieDetailsVariant} initial="hidden" animate="show" className="movie-container content-col">
          <motion.div variants={movieDetailsChildren} className="movie-title">
            <h1>{movie.title}</h1>
          </motion.div>
          <motion.div variants={movieDetailsChildren} className="movie-info">
            <span>{movie.year}</span>
            <span>{movie.runtime}</span>
            <span>R</span>
          </motion.div>
          <motion.div variants={movieDetailsChildren}>
            {isAuthenticated ? <MovieButtons filmId={movie.id} title={movie.title} ui={{ watchlist: movie.watchlist, rating: movie.rating, like: movie.like }} /> : <div className="login-prompt">Rate, like or add this film to your watchlist, <Link to={`/login`}>Log in</Link>.</div>}
          </motion.div>
          <motion.div variants={movieDetailsChildren}>
            <div className="movie-overview">
              {movie.overview}
            </div>
            <div className="movie-genres">
              {movie.genres.map(genre => <span className="movie-genre">{genre.name}</span>)}
            </div>
          </motion.div>
          <motion.div variants={movieDetailsChildren} className="movie-credits">
            <h3>Crew</h3>
            <div className="movie-credits-list">
              {movie.credits.crew.map(member => (
                <div className="movie-credit movie-crew">
                  <div className="movie-credit-name">{member.name}</div>
                  <div className="movie-credit-role">{member.job}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={movieDetailsChildren}>
            <Carousel cast={movie.credits.cast} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div >
  )
}