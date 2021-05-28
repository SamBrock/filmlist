import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, Redirect } from 'react-router-dom';

import { transitions } from '../config';
import { loadMovie, getMovieDetails, loading } from '../store/movie';
import { start, complete } from '../store/loadingBar';
import BackdropTemplate from './templates/BackdropTemplate';
import { getIsAuthenticated } from '../store/auth';
import MovieButtons from '../components/MovieButtons';
import Head from '../components/Head';
import CreditItem from '../components/CreditItem';
import { clearErrors, getMovieError } from '../store/error';
import Error from '../components/Error';

export default function MovieDetailPage({ match }) {
  const loadedMovie = useSelector(getMovieDetails);
  const [movie, setMovie] = useState(loadedMovie);
  const [errorRecieved, setErrorRecieved] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector(loading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const movieError = useSelector(getMovieError);

  const movieId = parseInt(match.params.id);

  useEffect(() => {
    if (!movieId) return;
    dispatch(loadMovie(movieId));
  }, [movieId, dispatch]);

  useEffect(() => {
    if (!loadedMovie) return;
    setMovie(loadedMovie);
  }, [loadedMovie]);

  useEffect(() => {
    if (!movieError) return;
    setErrorRecieved(true);
    dispatch(clearErrors());
  }, [movieError]);

  if (isLoading) dispatch(start());;

  if (errorRecieved || !movieId) {
    dispatch(complete());
    return <Error header='404' message="Movie not found" />
  };

  if (!movie || movie.id !== movieId) return <div></div>;
  dispatch(complete());

  return (
    <Fragment>
      <Head title={`${movie.title} (${movie.year})`} />
      <BackdropTemplate backdropPath={movie.backdrop_path}>
        <motion.div className="px-3 py-6 md:px-12 md:py-20" variants={transitions.movieDetailsVariant} initial="hidden" animate="show" exit={{ opacity: 0 }}>
          <motion.div variants={transitions.movieDetailsChildren}>
            <h1 className="text-heading font-extrabold mb-4 leading-none">{movie.title}</h1>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="flex mb-6">
            <span className="text-md font-medium text-opacity-2 mr-3">{movie.year}</span>
            <div className="text-md font-medium text-opacity-2 mr-3">
              {movie.runtime.hours !== 0 && (<span className="mr-1">{movie.runtime.hours}h</span>)}
              <span>{movie.runtime.minutes}m</span>
            </div>
            <span className="text-md font-medium text-opacity-2 mr-3">R</span>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="mb-6">
            {
              isAuthenticated ?
                <MovieButtons filmId={movie.id} title={movie.title} ui={{ watchlist: movie.watchlist, rating: movie.rating, like: movie.like }} /> :
                <div className="text-sm sm:text-md text-opacity-2 default-border p-3 text-center">Rate, like or add this film to your watchlist. <Link to={`/login`} className="text-white font-medium">Log in</Link>.</div>
            }
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="mb-12">
            <div className="leading-7 mb-6 text-sm md:text-md">
              {movie.overview}
            </div>
            <div className="font-semibold">
              {movie.genres.map(genre => <span className="mr-3">{genre.name}</span>)}
            </div>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren} className="mb-6">
            <h3 className="uppercase text-md text-orange1 font-semibold text-opacity-2 tracking-wider condensed">Crew</h3>
            <div className="flex flex-col overflow-x-hidden w-full list-none">
              {movie.credits.crew.map(member => <CreditItem name={member.name} role={member.job} />)}
            </div>
          </motion.div>
          <motion.div variants={transitions.movieDetailsChildren}>
            <h3 className="uppercase text-md text-orange1 font-semibold text-opacity-2 tracking-wider condensed">Cast</h3>
            <div className="flex flex-col overflow-x-hidden w-full list-none">
              {movie.credits.cast.map(member => <CreditItem name={member.name} role={member.character} />)}
            </div>
          </motion.div>
        </motion.div>
      </BackdropTemplate>
    </Fragment>
  )
}