import React from 'react';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function MovieButtons(props) {
  return (
    <div className="movie-buttons">
      <div className="movie-rate">
        <Rating name="hover-feedback" value={2} precision={0.5} />
      </div>
      <div className="movie-button btn-watchlist">
        <IconButton aria-label="add to watchlist" disableFocusRipple={true} disableRipple={true} onClick={props.addWatchlist}>
          <AddIcon />
        </IconButton>
      </div>
      <div className="movie-button btn-like">
        <IconButton aria-label="delete" disableFocusRipple={true} disableRipple={true} classes={{ label: 'heartIcon' }}>
          <FavoriteBorderIcon />
        </IconButton>
      </div>
    </div>
  )
}
