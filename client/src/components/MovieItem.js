import React, { useState, useEffect, useRef } from 'react'
import { TweenMax } from "gsap";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovieSeen, deleteMovieSeen, addMovieWatchlist } from '../store/movie';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MovieItemButtons from './MovieItemButtons';

export default function MovieItem({ movie, rating, like, page }) {
  const [hover, setHover] = useState(null);
  const [hide, setHide] = useState(null);

  // useEffect(() => {
  //   console.log(hide);
  // }, [hide])

  let moviePoster = useRef(null);
  let movieBackdrop = useRef(null);
  let movieInfo = useRef(null);

  const [posterAnimate, setPosterAnimate] = useState(null);
  const [backdropAnimate, setBackdropAnimate] = useState(null);
  const [infoAnimate, setInfoAnimate] = useState(null);

  useEffect(() => {
    TweenMax.staggerFromTo('.movie', .5, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0.1);
    TweenMax.staggerFromTo('.user-seen', .5, { opacity: 0 }, { opacity: 1 }, 0.1);

    setPosterAnimate(TweenMax.to(moviePoster, .5, { opacity: 0, scaleX: 1.1, scaleY: 1.1, paused: true }));
    setBackdropAnimate(TweenMax.to(movieBackdrop, .5, { opacity: 1, scaleX: 1, scaleY: 1, rotation: 0.01, paused: true }));
    setInfoAnimate(TweenMax.fromTo(movieInfo, .5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }).pause());
  }, []);

  const movieItemAnimations = [posterAnimate, backdropAnimate, infoAnimate];

  useEffect(() => {
    if (hover) movieItemAnimations.map(animation => animation.play());
    if (!hover && posterAnimate) movieItemAnimations.map(animation => animation.reverse());
  }, [hover])


  const posterIMG = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path;
  const backdropImg = 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className={`movie ${hide ? 'hide' : null}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="movie-poster-container">
          <img className="movie-poster" src={posterIMG} alt="movie poster" ref={element => moviePoster = element} />
        </div>
        <div className="movie-info-container">
          <div className="movie-backdrop-container">
            <div className="blur"></div>
            <img className="movie-backdrop" src={backdropImg} alt="movie backdrop" ref={element => movieBackdrop = element} />
          </div>
          <MovieItemButtons movie={movie} page={page} hover={hover} setHide={setHide} />
          <div className="movie-info-text" ref={element => movieInfo = element}>
            <div className="movie-title">{movie.title}</div>
            <div className="movie-subinfo">
              <div className="movie-year">{movie.year}</div>
              <div className="movie-average-vote" >{movie.vote_average}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-seen">
        <div className="user-seen-ui rating">
          {rating ? (<Rating className="seen-icon" name="hover-feedback" value={rating} precision={0.5} readOnly />) : null}
        </div>
        <div className="user-seen-ui like">
          {like ? (<FavoriteIcon className="seen-icon" />) : null}
        </div>
      </div>
    </Link >
  )
}

