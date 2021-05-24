import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteMovieSeen, deleteMovieWatchlist } from '../../store/movie';

export default function WatchlistRemoveBtn({ id, title, removeFrom }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    if (removeFrom === 'watchlist') return dispatch(deleteMovieWatchlist(id, title));
    if (removeFrom === 'seen') return dispatch(deleteMovieSeen(id, title));
  }

  return (
    <button className="font-bold text-opacity-2" aria-label="remove" onClick={(e) => handleClick(e)}>
      <span className="material-icons">clear</span>
    </button>
  )
}
