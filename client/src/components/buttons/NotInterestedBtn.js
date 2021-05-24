import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addMovieNotInterested, deleteMovieNotInterested } from '../../store/movie';

export default function NotInterestedBtn({ id, title, notInterested, setNotInterested, hide }) {

  const dispatch = useDispatch();

  const handleInterested = (e, inNotInterested) => {
    e.preventDefault();
    setNotInterested(inNotInterested);
    inNotInterested ? dispatch(addMovieNotInterested(id, title)) : dispatch(deleteMovieNotInterested(id, title));
  }

  if(hide) return <div></div>;

  return (
    !notInterested ?
      <button className="font-bold text-opacity-2" aria-label="add to watchlist" onClick={(e) => handleInterested(e, true)}>
        <span className="material-icons">not_interested</span>
      </button> :
      <button className="font-bold text-opacity-2" aria-label="remove from watchlist" onClick={(e) => handleInterested(e, false)}>
        <span className="material-icons">undo</span>
      </button>
  )
}
