import React, { useState, useEffect, useRef } from 'react'
import { TweenMax } from "gsap";
import { Link } from 'react-router-dom';

export default function MovieItem({ movie }) {
  let moviePoster = useRef(null);
  let movieBackdrop = useRef(null);
  let movieInfo = useRef(null);
  let movieTopInfo = useRef(null);

  const [posterAnimate, setPosterAnimate] = useState(null);
  const [backdropAnimate, setBackdropAnimate] = useState(null);
  const [infoAnimate, setInfoAnimate] = useState(null);
  const [infoTopAnimate, setInfoTopAnimate] = useState(null);

  useEffect(() => {
    TweenMax.staggerFromTo('.movie', .5, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0.1);

    setPosterAnimate(TweenMax.to(moviePoster, .5, { opacity: 0, scaleX: 1.1, scaleY: 1.1, paused: true }));
    setBackdropAnimate(TweenMax.to(movieBackdrop, .5, { opacity: 1, scaleX: 1, scaleY: 1, rotation: 0.01, paused: true }));
    setInfoAnimate(TweenMax.fromTo(movieInfo, .5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }).pause());
    setInfoTopAnimate(TweenMax.fromTo(movieTopInfo, .5, { opacity: 0, y: -10 }, { opacity: 1, y: 0 }).pause());

  }, []);

  function overOn() {
    if (posterAnimate) {
      posterAnimate.play();
      backdropAnimate.play();
      infoAnimate.play();
      infoTopAnimate.play();
    }
  }

  function overOut() {
    if (posterAnimate) {
      posterAnimate.reverse();
      backdropAnimate.reverse();
      infoAnimate.reverse();
      infoTopAnimate.reverse();
    }
  }

  const posterIMG = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
  const backdropImg = 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="movie" onMouseEnter={overOn} onMouseLeave={overOut}>
        <div className="movie-poster-container">
          <img className="movie-poster" src={posterIMG} alt="movie poster" ref={element => moviePoster = element} />
        </div>
        <div className="movie-info-container">
          <div className="movie-backdrop-container">
            <div className="blur"></div>
            <img className="movie-backdrop" src={backdropImg} alt="movie backdrop" ref={element => movieBackdrop = element} />
          </div>
          <div className="movie-info-text-top" ref={element => movieTopInfo = element}>

          </div>
          <div className="movie-info-text" ref={element => movieInfo = element}>
            <div className="movie-title">{movie.title}</div>
            <div className="movie-subinfo">
              <div className="movie-year">{movie.year}</div>
              <div className="movie-average-vote" >{movie.vote_average}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}