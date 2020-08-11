import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieRating, loadUI, getUiData, deleteMovieWatchlist, addMovieWatchlist } from '../store/movie';
import { getIsAuthenticated } from '../store/auth';

export default function MovieButtons({ filmId }) {
  const [rating, setRating] = useState(0);
  const [watchlist, setWatchlist] = useState(false);

  const isAuthenticated = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();

  const ui = useSelector(getUiData);
  // ;

  useEffect(() => {
    if (isAuthenticated) dispatch(loadUI(filmId));
  }, [isAuthenticated])

  useEffect(() => {
    setRating(ui.rating);
    setWatchlist(ui.watchlist);
  }, [ui])

  const handleRating = (rating) => {
    setRating(rating);
    dispatch(addMovieRating(filmId, rating));
  }

  const handleWatchlist = (inWatchlist) => {
    setWatchlist(inWatchlist);
    inWatchlist ? dispatch(addMovieWatchlist(filmId)) : dispatch(deleteMovieWatchlist(filmId));
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
        <IconButton aria-label="delete" disableFocusRipple={true} disableRipple={true} classes={{ label: 'heartIcon' }}>
          <FavoriteBorderIcon />
        </IconButton>
      </div>
    </div>
  )
}
