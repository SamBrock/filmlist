import React, { useState, useEffect, useRef } from 'react'
import { TweenMax } from "gsap";
import { Link } from 'react-router-dom';

export default function MovieItem(props) {
    let moviePoster = useRef(null);
    let movieBackdrop = useRef(null);
    let movieInfo = useRef(null);

    const [posterAnimate, setPosterAnimate] = useState(null);
    const [backdropAnimate, setBackdropAnimate] = useState(null);
    const [infoAnimate, setInfoAnimate] = useState(null);

    useEffect(() => {
        TweenMax.staggerFromTo('.movie', .5, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, 0.1);

        setPosterAnimate(
            TweenMax.to(moviePoster, .5, { opacity: 0, scaleX: 1.1, scaleY: 1.1, paused: true })
        );

        setBackdropAnimate(
            TweenMax.to(movieBackdrop, .5, { opacity: 1, scaleX: 1, scaleY: 1, rotation: 0.01, paused: true })
        );

        setInfoAnimate(
            TweenMax.fromTo(movieInfo, .5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }).pause()
        );

    }, []);

    function overOn() {
        posterAnimate.play();
        backdropAnimate.play();
        infoAnimate.play();
    }

    function overOut() {
        posterAnimate.reverse();
        backdropAnimate.reverse();
        infoAnimate.reverse();
    }

    const posterIMG = 'https://image.tmdb.org/t/p/w500/' + props.movie.poster_path;
    const backdropImg = 'https://image.tmdb.org/t/p/w500/' + props.movie.backdrop_path;
    const d = new Date(props.movie.release_date);
    const releaseYear = d.getFullYear();

    return (
        <Link to={`/movie/${props.movie.id}`}>
            <div className="movie" onMouseEnter={overOn} onMouseLeave={overOut}>
                <div className="movie-poster-container">
                    <img className="movie-poster" src={posterIMG} alt="movie poster" ref={element => moviePoster = element} />
                </div>
                <div className="movie-info-container">
                    <div className="movie-backdrop-container">
                        <div className="blur"></div>
                        <img className="movie-backdrop" src={backdropImg} alt="movie backdrop" ref={element => movieBackdrop = element} />
                    </div>
                    <div className="movie-info-text" ref={element => movieInfo = element}>
                        <div className="movie-title" >{props.movie.title}</div>
                        <div className="movie-year-genre">
                            <span className="movie-year">{releaseYear}</span><span className="movie-info-divider">|</span>
                            {props.movie.genre_ids.map((id, index) => {
                                const item = props.genres.filter(genre => genre.id === id);
                                if (item.length)
                                    return (
                                        <span className="movie-genre" key={id}>{item.shift().name}{index + 1 !== props.movie.genre_ids.length && ','} </span>
                                    )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </Link>
    )
}


