import React, { useState, useEffect, useRef } from 'react'
import { TweenMax } from "gsap";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useWindowSize } from '../hooks/window-hooks';
import { transition } from "../transitions"
import MovieItemButtons from './MovieItemButtons';
import StarRating from './StarRating';

export default function MovieItem({ movie, page, showButtons }) {
  const [show, setShow] = useState(null);
  const [hide, setHide] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [disable, setDisable] = useState(false);

  const [width] = useWindowSize();

  let moviePoster = useRef(null);
  let movieBackdrop = useRef(null);
  let movieInfo = useRef(null);

  const [posterAnimate, setPosterAnimate] = useState(null);
  const [backdropAnimate, setBackdropAnimate] = useState(null);
  const [infoAnimate, setInfoAnimate] = useState(null);

  useEffect(() => {
    setPosterAnimate(TweenMax.to(moviePoster, .5, { opacity: 0, scaleX: 1.1, scaleY: 1.1, paused: true }));
    setBackdropAnimate(TweenMax.to(movieBackdrop, .5, { opacity: 1, scaleX: 1, scaleY: 1, rotation: 0.01, paused: true }));
    setInfoAnimate(TweenMax.fromTo(movieInfo, .5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }).pause());
  }, []);

  const movieItemAnimations = [posterAnimate, backdropAnimate, infoAnimate];

  useEffect(() => {
    if (show && !disable) movieItemAnimations.map(animation => animation.play());
    if (!show && posterAnimate) movieItemAnimations.map(animation => animation.reverse());
  }, [show, disable]);

  const posterImg = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path;
  const backdropImg = 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;

  const handleMouseEnter = () => {
    if (width < 1367) return;
    setShow(true);
  }

  return (
    <div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={transition}>
      <Link to={show ? `/movie/${movie.id}` : '#'}>
        <div style={imgLoaded ? {} : { display: 'none' }} className={`relative cursor-pointer z-10 ${disable ? 'opacity-10' : ''} ${hide ? 'hide-movie' : null}`} onClick={() => setShow(true)} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => setShow(false)}>
          <div className="max-w-full my-0 mx-auto h-full w-full top-0 left-0 overflow-hidden">
            <img className=" block w-full h-full object-cover" src={posterImg} alt="movie poster" ref={element => moviePoster = element} onLoad={() => setImgLoaded(true)} />
          </div>
          <div className="max-w-full my-0 mx-auto h-full absolute top-0 left-0">
            <div className="w-full h-full overflow-hidden relative">
              <div className="absolute top-0 blur w-full h-full z-30"></div>
              <img className="blur w-full h-full opacity-0 object-cover scale-default filter" src={backdropImg ? backdropImg : posterImg} alt={movie.title} ref={element => movieBackdrop = element} />
            </div>
            {
              !disable || showButtons ? (
                <MovieItemButtons show={show} page={page} id={movie.id} title={movie.title} disable={setDisable} />
              ) : null
            }
            <div className="absolute bottom-6 left-6 right-6 opacity-0" ref={element => movieInfo = element}>
              <div className="font-bold text-xxl">{movie.title}</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm font-medium text-opacity-2 py-1">{movie.year}</div>
                <div className="font-semibold text-primary border-primary-opacity text-sm py-0.5 px-2" >{movie.vote_average}</div>
              </div>
            </div>
          </div>
        </div>
        {
          page === 'seen' && (
            <div style={imgLoaded ? {} : { display: 'none' }} className="mt-2 flex justify-between items-center">
              <StarRating rating={movie.rating} readOnly={true} />
              {
                movie.like && (
                  <span className="material-icons text-lg ml-3 text-opacity-primary">favorite</span>
                )
              }
            </div>
          )
        }
      </Link >
    </div>
  )
}