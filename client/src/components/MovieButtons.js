import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { addMovieRating, deleteMovieWatchlist, addMovieWatchlist, addMovieLike, deleteMovieLike } from '../store/movie';

export default function MovieButtons({ filmId, ui }) {
  const [rating, setRating] = useState(0);
  const [watchlist, setWatchlist] = useState(false);
  const [like, setLike] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setRating(ui.rating);
    setWatchlist(ui.watchlist);
    setLike(ui.like);
  }, [ui])

  // console.log(ui);

  const handleRating = (rating) => {
    setRating(rating);
    setWatchlist(false);
    dispatch(addMovieRating(filmId, rating));
  }

  const handleWatchlist = (inWatchlist) => {
    setWatchlist(inWatchlist);
    inWatchlist ? dispatch(addMovieWatchlist(filmId)) : dispatch(deleteMovieWatchlist(filmId));
  }

  const handleLike = (isLiked) => {
    setLike(isLiked); 
    isLiked ? dispatch(addMovieLike(filmId)) : dispatch(deleteMovieLike(filmId));
  }

  return (
    <div className="movie-buttons">
      <div className="movie-rate">
        <Rating name="hover-feedback" value={rating} precision={0.5} onChange={(event, newValue) => handleRating(newValue)} />
      </div>
      <div className="movie-button btn-watchlist">
        {
          !watchlist ?
            <IconButton aria-label="add to watchlist" disableFocusRipple={true} disableRipple={true} onClick={() => handleWatchlist(true)}>
              <AddIcon />
            </IconButton> :
            <IconButton aria-label="add to watchlist" disableFocusRipple={true} disableRipple={true} onClick={() => handleWatchlist(false)}>
              <RemoveIcon />
            </IconButton>
        }
      </div>
      <div className="movie-button btn-like">
        {
          !like ?
            <IconButton aria-label="like" disableFocusRipple={true} disableRipple={true} classes={{ label: 'heartIcon' }} onClick={() => handleLike(true)}>
              <FavoriteBorderIcon />
            </IconButton> :
            <IconButton aria-label="unlike" disableFocusRipple={true} disableRipple={true} onClick={() => handleLike(false)}>
              <FavoriteIcon />
            </IconButton>
        }
      </div>
    </div>
  )
}
