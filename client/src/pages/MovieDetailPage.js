import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadMovie, getMovieDetails, addMovieToWatchlist } from '../store/movie';
import { start, complete } from '../store/loadingBar';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function MovieDetailPage({ match }) {
  const dispatch = useDispatch();

  const movieId = parseInt(match.params.id);
  useEffect(() => {
    dispatch(loadMovie(movieId));
  }, [movieId])

  const movie = useSelector(getMovieDetails);

  const handleClick = () => {
    dispatch(addMovieToWatchlist(movieId)); //
  }

  const isLoading = useSelector(state => state.entities.movie.loading);

  if (movieId !== movie.id) {
    dispatch(start());
    return null;
  } else {
    document.title = `${movie.title} (${movie.year}) • FILMLIST`
    dispatch(complete());
    return (
      <div data-router-view="movie-page" className="movie-page-container">
        <div className="backdrop-container">
          <img src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}></img>
        </div>
        <div className="movie-container">
          <div className="movie-title">
            <h1>{movie.title}</h1>
          </div>
          <div className="movie-info">
            <span>{new Date(movie.release_date).getFullYear()}</span><span>|</span>
            <span>{movie.runtime}</span><span>|</span>
            <span>R</span>
          </div>
          <div className="movie-rate">
            <Rating name="hover-feedback" value={2} precision={0.5} />
            <IconButton aria-label="delete" disableFocusRipple={true} disableRipple={true}>
              <AddCircleIcon />
            </IconButton>
            <IconButton aria-label="delete" disableFocusRipple={true} disableRipple={true} classes={{label: 'heartIcon'}}>
              <FavoriteIcon />
            </IconButton>
          </div>
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
                <div className="movie-credit">
                  <div className="movie-credit-name">{member.name}</div>
                  <div className="movie-credit-role">{member.job}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="movie-credits">
            <h3>Cast</h3>
            <div className="movie-credits-list">
              <OwlCarousel className="owl-theme" margin={10} dots={false}>
                {movie.credits.cast.map(member => (
                  <div className="movie-credit">
                    <div className="movie-credit-img">
                      <img src={`https://image.tmdb.org/t/p/w138_and_h175_face${member.profile_path}`} />
                    </div>
                    <div className="movie-credit-name">{member.name}</div>
                    <div className="movie-credit-role">{member.character}</div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    )
  }

}