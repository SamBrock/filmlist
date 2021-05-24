import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addMovieWatchlist, deleteMovieWatchlist } from '../../store/movie';

const StyledSpan = styled.button`
  ${props => props.theme.mixins.buttonSize}
`;

export default function WatchlistBtn({ filmId, title, watchlist, setWatchlist }) {
  const dispatch = useDispatch();

  const handleClick = (inWatchlist) => {
    setWatchlist(inWatchlist)    
    inWatchlist ? dispatch(addMovieWatchlist(filmId, title)) : dispatch(deleteMovieWatchlist(filmId, title));
  }

  return (
    !watchlist ?
      <button aria-label="add to watchlist" onClick={() => handleClick(true)}>
        <StyledSpan className="material-icons text-primary">add</StyledSpan>
      </button> :
      <button aria-label="remove from watchlist" onClick={() => handleClick(false)}>
        <StyledSpan className="material-icons text-primary">remove</StyledSpan>
      </button>
  )
}
