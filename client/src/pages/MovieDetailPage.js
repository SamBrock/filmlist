import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { transitions } from '../config';
import { loadMovie, getMovieDetails, loading } from '../store/movie';
import { start, complete } from '../store/loadingBar';
import BackdropTemplate from './templates/BackdropTemplate';
import { getIsAuthenticated } from '../store/auth';
import MovieButtons from '../components/MovieButtons';
import Head from '../components/Head';

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();

  const movieId = parseInt(match.params.id);
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId, dispatch])

  const movie = useSelector(getMovieDetails);

  const isLoading = useSelector(loading);

  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isLoading) {
    dispatch(start());
    return null;
  }

  dispatch(complete());

  if(!movie) return <div></div>;

  return (
    <Fragment>
      <Head title={`${movie.title} (${movie.year})`} />
      <BackdropTemplate backdropPath={movie.backdrop_path}>
        <motion.div className="p-12 px-14" variants={transitions.movieDetailsVariant} initial="hidden" animate="show" exit={{ opacity: 0 }}>
          <motion.div variants={transitions.movieDetailsChildren}>
            <h1 className="text-heading font-extrabold mb-4">{movie.title}</h1>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="mb-6">
            <span className="text-md font-medium text-opacity-2 mr-3">{movie.year}</span>
            <span className="text-md font-medium text-opacity-2 mr-3">{movie.runtime}</span>
            <span className="text-md font-medium text-opacity-2 mr-3">R</span>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="mb-6">
            {
              isAuthenticated ?
                <MovieButtons filmId={movie.id} title={movie.title} ui={{ watchlist: movie.watchlist, rating: movie.rating, like: movie.like }} /> :
                <div className="text-opacity-2 default-border p-3 text-center">Rate, like or add this film to your watchlist. <Link to={`/login`} className="text-white font-medium">Log in</Link>.</div>
            }
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="mb-12">
            <div className="leading-7 mb-6">
              {movie.overview}
            </div>
            <div className="font-semibold">
              {movie.genres.map(genre => <span className="mr-3">{genre.name}</span>)}
            </div>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="mb-6">
            <h3 className="uppercase text-md text-orange1 font-semibold text-opacity-2 tracking-wider condensed">Crew</h3>
            <div className="grid grid-cols-3">
              {movie.credits.crew.map(member => (
                <div className="flex flex-col">
                  <div className="font-semibold">{member.name}</div>
                  <div className="text-opacity-2">{member.job}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren}>
          </motion.div>
        </motion.div>
      </BackdropTemplate>
    </Fragment>
  )
}