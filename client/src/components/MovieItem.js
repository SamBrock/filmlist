import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import slugify from 'slugify';
import { isMobile, isTablet } from "react-device-detect";

import { userActions, springConfig, tmdbImageUrl } from '../config';
import MovieItemButtons from './MovieItemButtons';
import StarRating from './StarRating';
import { useWindowSize } from '../hooks/window-hooks';
import { breakpoints } from '../styles/mixins';

export default function MovieItem({ movie, page, showButtons }) {
  const [action, setAction] = useState(false);
  const [show, setShow] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const divRef = useRef();

  const [posterAnimateStyles, posterAnimate] = useSpring(() => ({ config: springConfig }));
  const [backdropAnimateStyles, backdropAnimate] = useSpring(() => ({ config: springConfig }));
  const [posterImgAnimateStyles, posterImgAnimate] = useSpring(() => ({ config: springConfig }));
  const [backdropImgAnimateStyles, backdropImgAnimate] = useSpring(() => ({ config: springConfig }));
  const [infoAnimateStyles, infoAnimate] = useSpring(() => ({ config: springConfig }));

  const animations = [
    { spring: posterAnimate, in: { opacity: 0 }, out: { opacity: 1 } },
    { spring: posterImgAnimate, in: { transform: `scale(1.1)`, filter: `blur(2px)` }, out: { transform: `scale(1.001)`, filter: `blur(0px)` } },
    { spring: backdropAnimate, in: { opacity: 1 }, out: { opacity: 0 } },
    { spring: backdropImgAnimate, in: { transform: `scale(1.02)`, filter: `blur(2px) brightness(50%)` }, out: { transform: `scale(1.1)`, filter: `blur(4px) brightness(50%)` } },
    { spring: infoAnimate, in: { opacity: 1 }, out: { opacity: 0 } },
  ];

  useEffect(() => {
    if (action) return;
    animations.map(a => a.spring.start(show ? a.in : a.out));
  }, [show, action]);

  useEffect(() => {
    if (!movie.userAction) return;
    setAction(userActions[movie.userAction - 1]);
    animations.map(a => a.spring.start(a.out));
  }, [movie]);

  return (
    <Link className="block overflow-hidden relative" to={`/movie/${movie.id}-${slugify(movie.title, { lower: true, remove: /[*+~.()'"!:@]/g })}`}>
      <div className="pointer-events-none sm:pointer-events-auto relative cursor-pointer" onClick={() => setShow(true)} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)} ref={divRef}>
        <animated.div style={posterAnimateStyles} className="max-w-full my-0 mx-auto h-full w-full top-0 left-0 overflow-hidden">
          <animated.img style={posterImgAnimateStyles} className={`w-full h-full object-cover ${action ? 'hidden' : 'block'}`} src={tmdbImageUrl.poster + movie.poster_path} alt="movie poster" />
          <animated.div style={{ height: action ? (divRef.current.offsetWidth / 100) * 150 : 0 }} className={`flex flex-col justify-center items-center w-full h-full object-cover border-default ${!action ? 'hidden' : 'block'}`} >
            <span className="material-icons font-bold text-heading mb-2 text-opacity-1">{action.icon}</span>
            <div className="uppercase font-medium text-opacity-1 flex items-center">{action.text}</div>
            <animated.div className="absolute bottom-6 left-6 right-6">
              <div className="font-bold text-xl text-opacity-2">{movie.title}</div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm font-medium text-opacity-1 py-1">{movie.year}</div>
                <div className="font-semibold text-opacity-1 text-sm py-0.5 border-opacity px-2" >{movie.vote_average}</div>
              </div>
            </animated.div>
          </animated.div>
        </animated.div>
        <animated.div style={backdropAnimateStyles} className="hidden sm:block max-w-full my-0 mx-auto h-full absolute top-0 left-0">
          <div className="w-full h-full overflow-hidden relative">
            <div className="absolute top-0 blur w-full h-full z-30"></div>
            <animated.img style={backdropImgAnimateStyles} className="blur w-full h-full object-cover brightness-50" src={movie.backdrop_path ? tmdbImageUrl.backdrop + movie.backdrop_path : tmdbImageUrl.backdrop + movie.poster_path} alt={movie.title} onLoad={() => setImgLoaded(true)} />
          </div>
          <MovieItemButtons show={show} page={page} id={movie.id} title={movie.title} disable={action ? true : false} />
          <animated.div style={infoAnimateStyles} className="absolute bottom-6 left-6 right-6">
            <div className="font-bold text-xl">{movie.title}</div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-sm font-medium text-opacity-2 py-1">{movie.year}</div>
              <div className="font-semibold text-primary border-primary-opacity text-sm py-0.5 px-2" >{movie.vote_average}</div>
            </div>
          </animated.div>
        </animated.div>
      </div>
      <div style={infoAnimateStyles} className="block sm:hidden mt-2 mb-4">
        <div className="font-bold text-md">{movie.title}</div>
        <div className="flex items-center mt-1">
          <div className="text-sm font-medium text-opacity-2 mr-3 py-0.5">{movie.year}</div>
          <div className="font-semibold text-primary border-primary-opacity text-xs py-0.5 px-1" >{movie.vote_average}</div>
          {page === 'seen' && (<div className="flex sm:hidden items-center ml-auto py-0.5"> <StarRating className="text-sm" rating={movie.rating} readOnly={true} /> { movie.like && (<span className="material-icons ml-2 text-sm text-opacity-primary">favorite</span>)} </div>)}
        </div>
      </div>
      {(isMobile || isTablet) && ( <div style={infoAnimateStyles} className="hidden sm:block mt-2 mb-4"> <div className="font-bold text-md">{movie.title}</div> <div className="flex items-center mt-1"> <div className="text-sm font-medium text-opacity-2 mr-3 py-0.5">{movie.year}</div> <div className="font-semibold text-primary border-primary-opacity text-xs py-0.5 px-1" >{movie.vote_average}</div> {page === 'seen' && (<div className="flex sm:hidden items-center ml-auto py-0.5"> <StarRating className="text-sm" rating={movie.rating} readOnly={true} /> { movie.like && (<span className="material-icons ml-2 text-sm text-opacity-primary">favorite</span>)} </div>)} </div> </div> )}
      { page === 'seen' && ( <div className={`hidden sm:flex justify-between items-center mt-2 ${imgLoaded ? 'flex' : 'hidden'}`}> <StarRating rating={movie.rating} readOnly={true} /> { movie.like && (<span className="material-icons text-lg ml-3 text-opacity-primary">favorite</span>)} </div> ) }
    </Link >
  )
}