import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addMovieWatchlist, deleteMovieWatchlist } from '../../store/movie';

export default function WatchlistRemoveBtn({ id, title }) {
  const [watchlist, setWatchlist] = useState(true);

  const dispatch = useDispatch();

  const handleWatchlist = (e, inWatchlist) => {
    e.preventDefault();
    setWatchlist(inWatchlist);
    inWatchlist ? dispatch(addMovieWatchlist(id, title)) : dispatch(deleteMovieWatchlist(id, title));
  }

  return (
    !watchlist ?
      <button className="font-bold text-opacity-2" aria-label="remove from watchlist" disableFocusRipple={true} disableRipple={true} onClick={(e) => handleWatchlist(e, true)}>
        <span className="material-icons">undo</span>
      </button> :
      <button className="font-bold text-opacity-2" aria-label="add to watchlist" disableFocusRipple={true} disableRipple={true} onClick={(e) => handleWatchlist(e, false)}>
        <span className="material-icons">clear</span>
      </button>
  )
}
