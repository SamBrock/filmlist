import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails, loading } from '../store/movie';
import { start, complete } from '../store/loadingBar';
import MovieButtons from '../components/MovieButtons';
import Carousel from '../components/layout/Carousel';
import { motion } from 'framer-motion';
import { useWindowSize } from '../hooks/useWindowSize';

const transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }
const transition2 = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }

export default function MovieDetailPage({ match }) {
  const [backdropWidth, setBackdropWidth] = useState(0);
  const [img, setImg] = useState(new Image);
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();

  const movieId = parseInt(match.params.id);
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId])

  const movie = useSelector(getMovieDetails);
  img.src = "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
  img.onload = () => { return true };

  const isLoading = useSelector(loading);

  useEffect(() => {
    const element = document.getElementById('backdrop-placeholder');
    if (element) setBackdropWidth(element.getBoundingClientRect().width);
  }, [width, height])

  if (isLoading) {
    dispatch(start());
    return null;
  }

  document.title = `${movie.title} (${movie.year}) - FILMLIST`
  dispatch(complete());
  return (
    <motion.div exit={{ opacity: 1 }} className="movie-page-container">
      <div className="backdrop-container" style={{ width: `${backdropWidth}px` }}>
        {img.onload() ? <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={transition} src={img.src} /> : null}
      </div>
      <div className="movie-details-container">
        <div id="backdrop-placeholder"></div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition2} className="movie-container">
          <div className="movie-title">
            <h1>{movie.title}</h1>
          </div>
          <div className="movie-info">
            <span>{movie.year}</span>
            <span>{movie.runtime}</span>
            <span>R</span>
          </div>
          <MovieButtons filmId={movie.id} title={movie.title} ui={{ watchlist: movie.watchlist, rating: movie.rating, like: movie.like }} />
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
        </motion.div>
      </div>
    </motion.div>
  )
}