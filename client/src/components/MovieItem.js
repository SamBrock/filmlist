import React, { useState, useEffect, useRef } from 'react'
import { TweenMax } from "gsap";
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MovieItemButtons from './MovieItemButtons';
import { motion } from 'framer-motion';
import { useWindowSize } from '../hooks/window-hooks';
import { transition } from "../transitions/transitions"

export default function MovieItem({ movie, rating, like, page, isUserAuth}) {
  const [show, setShow] = useState(null);
  const [hide, setHide] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

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
    if (show) movieItemAnimations.map(animation => animation.play());
    if (!show && posterAnimate) movieItemAnimations.map(animation => animation.reverse());
  }, [show])

  const posterImg = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path;
  const backdropImg = 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;

  const handleMouseEnter = () => {
    if (width < 1367) return;
    setShow(true);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={transition}>
      <Link to={show ? `/movie/${movie.id}` : '#'}>
        <div style={imgLoaded ? {} : { display: 'none' }} className={`movie ${hide ? 'hide-movie' : null}`} onClick={() => setShow(true)} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => setShow(false)}>
          <div className="movie-poster-container">
            <img className="movie-poster" src={posterImg} alt="movie poster" ref={element => moviePoster = element} onLoad={() => setImgLoaded(true)} />
          </div>
          <div className="movie-info-container">
            <div className="movie-backdrop-container">
              <div className="blur"></div>
              <img className="movie-backdrop" src={backdropImg ? backdropImg : posterImg} alt="movie backdrop" ref={element => movieBackdrop = element} />
            </div>
            {isUserAuth ? <MovieItemButtons className={!show ? 'disable' : ''} movie={movie} page={page} show={show} setHide={setHide} setShow={setShow} /> : ''}
            <div className="movie-info-text" ref={element => movieInfo = element}>
              <div className="movie-title">{movie.title}</div>
              <div className="movie-subinfo">
                <div className="movie-year">{movie.year}</div>
                <div className="movie-average-vote" >{movie.vote_average}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={imgLoaded ? {} : { display: 'none' }} className="user-seen">
          <div className="user-seen-ui rating">
            {rating ? (<Rating className="seen-icon" name="hover-feedback" value={rating} precision={0.5} readOnly />) : null}
          </div>
          <div className="user-seen-ui like">
            {like ? (<FavoriteIcon className="like-icon" />) : null}
          </div>
        </div>
      </Link >
    </motion.div>
  )
}