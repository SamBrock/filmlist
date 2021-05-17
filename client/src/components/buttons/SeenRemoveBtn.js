import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addMovieSeen, deleteMovieSeen } from '../../store/movie';

export default function SeenRemoveBtn({ id, title }) {
  const [seen, setSeen] = useState(true);

  const dispatch = useDispatch();

  const handleSeen = (e, inSeen) => {
    e.preventDefault();
    setSeen(inSeen);
    inSeen ? dispatch(addMovieSeen(id, title)) : dispatch(deleteMovieSeen(id, title));
  }

  return (
    !seen ?
      <button className="font-bold text-opacity-2" aria-label="remove from seen" disableFocusRipple={true} disableRipple={true} onClick={(e) => handleSeen(e, true)}>
        <span className="material-icons">undo</span>
      </button> :
      <button className="font-bold text-opacity-2" aria-label="add to seen" disableFocusRipple={true} disableRipple={true} onClick={(e) => handleSeen(e, false)}>
        <span className="material-icons">clear</span>
      </button>
  )
}
