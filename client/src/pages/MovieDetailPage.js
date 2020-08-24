import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails, loading } from '../store/movie';
import { start, complete } from '../store/loadingBar';
import MovieButtons from '../components/MovieButtons';
import Carousel from '../components/layout/Carousel';
import { motion } from 'framer-motion';
import BackdropImg from '../components/layout/BackdropImg';
import Footer from '../components/layout/Footer';

const transition = { ease: [0.43, 0.13, 0.23, 0.96] }
const transition2 = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }

const movieDetailsVariant = {
  hidden: {
    y: 0
  },
  show: {
    y: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1
    }
  }
}

const movieDetailsChildren = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ...transition }
  }
}

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();

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
            <MovieButtons filmId={movie.id} title={movie.title} ui={{ watchlist: movie.watchlist, rating: movie.rating, like: movie.like }} />
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