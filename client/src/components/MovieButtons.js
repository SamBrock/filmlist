import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import StarRating from './StarRating';
import { addMovieRating, deleteMovieWatchlist, addMovieWatchlist, addMovieLike, deleteMovieLike } from '../store/movie';

export default function MovieButtons({ filmId, title, ui }) {
  const [rating, setRating] = useState(ui.rating || 0);
  const [watchlist, setWatchlist] = useState(ui.watchlist || false);
  const [like, setLike] = useState(ui.like || false);

  const dispatch = useDispatch();

  const handleRating = (rating) => {
    setRating(rating);
    setWatchlist(false);
    dispatch(addMovieRating(filmId, rating));
  }

  const handleWatchlist = (inWatchlist) => {
    setWatchlist(inWatchlist);
    inWatchlist ? dispatch(addMovieWatchlist(filmId, title)) : dispatch(deleteMovieWatchlist(filmId, title));
  }

  const handleLike = (isLiked) => {
    setLike(isLiked);
    isLiked ? dispatch(addMovieLike(filmId)) : dispatch(deleteMovieLike(filmId));
  }

  return (
    <div className="flex items-center">
      <div className="mr-12">
        <StarRating rating={rating} readOnly={false} onChange={(event, newValue) => handleRating(newValue)} />
      </div>
      <div className="mr-12">
        {
          !watchlist ?
            <button className="font-bold" aria-label="add to watchlist" onClick={() => handleWatchlist(true)}>
              <span className="material-icons text-primary" style={{ fontSize: '2.4em' }}>add</span>
            </button> :
            <button aria-label="remove from watchlist" onClick={() => handleWatchlist(false)}>
              <span className="material-icons text-primary" style={{ fontSize: '2.4em' }}>remove</span>
            </button>
        }
      </div>
      <div>
        {
          !like ?
            <button aria-label="like" classes={{ label: 'heartIcon' }} onClick={() => handleLike(true)}>
              <span className="material-icons text-primary" style={{ fontSize: '2.4em' }}>favorite_border</span>
            </button> :
            <button aria-label="unlike" onClick={() => handleLike(false)}>
              <span className="material-icons text-primary" style={{ fontSize: '2.4em' }}>favorite</span>
            </button>
        }
      </div>
    </div>
  )
}
