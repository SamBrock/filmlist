import React, { useState, useRef, useEffect } from 'react';
import { TweenMax } from "gsap";
import { useDispatch } from 'react-redux';
import { addMovieWatchlist, addMovieSeen, deleteMovieSeen, addMovieNotInterested, deleteMovieNotInterested, deleteMovieWatchlist } from '../store/movie';
import ClearIcon from '@material-ui/icons/Clear';
import UndoIcon from '@material-ui/icons/Undo';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

export default function MovieItemButtons({ match, movie, page, show, setHide, setShow }) {
  const [topBtns, setTopBtns] = useState(null);
  const [addBtn, setAddBtn] = useState(null);
  const [isSeen, setSeen] = useState(false);
  const [isNotInterested, setNotInterested] = useState(false);
  const [isWatchlist, setWatchlist] = useState(true);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setSeen(isSeen);
    setNotInterested(isNotInterested);
    setWatchlist(isWatchlist);
  }, [isSeen, isNotInterested, isWatchlist])

  let movieTopBtns = useRef(null);
  let movieAdddBtn = useRef(null);

  useEffect(() => {
    setTopBtns(TweenMax.fromTo(movieTopBtns, .5, { opacity: 0, y: -10 }, { opacity: 1, y: 0 }).pause());
    setAddBtn(TweenMax.fromTo(movieAdddBtn, .5, { opacity: 0 }, { opacity: 1 }).pause());
  }, [page])

  const movieButtonAnimations = [topBtns, addBtn];

  if (show) movieButtonAnimations.map(animation => animation.play());
  if (!show && topBtns) movieButtonAnimations.map(animation => animation.reverse());

  const handleWatchlist = (e, watchlist) => {
    setWatchlist(watchlist);
    if (page !== 'movies') setHide(!watchlist);
    setAddedToWatchlist(watchlist);
    watchlist ? dispatch(addMovieWatchlist(movie.id, movie.title)) : dispatch(deleteMovieWatchlist(movie.id, movie.title));
    e.preventDefault();
  }

  const handleSeen = (e, seen) => {
    setSeen(seen);
    setHide(seen);
    setShow(!seen);
    seen ? dispatch(addMovieSeen(movie.id, movie.title)) : dispatch(deleteMovieSeen(movie.id, movie.title));
    e.preventDefault();
  }

  const handleNotInterested = (e, notInterested) => {
    setNotInterested(notInterested);
    setHide(notInterested);
    
    notInterested ? dispatch(addMovieNotInterested(movie.id, movie.title)) : dispatch(deleteMovieNotInterested(movie.id, movie.title));
    e.preventDefault();
  }

  const handleRemove = (e, seen) => {
    setSeen(seen);
    setHide(seen);
    setShow(!seen);
    seen ? dispatch(deleteMovieSeen(movie.id, movie.title)) : dispatch(addMovieSeen(movie.id, movie.title));
    e.preventDefault();
  }

  if (page === 'movies') {
    return (
      <div className="movie-item-buttons">
        <div className="top-btns" ref={el => movieTopBtns = el}>
          {!addedToWatchlist ? !isNotInterested ? !isSeen ? <div className="seen-btn" onClick={(e) => handleSeen(e, true)}><VisibilityOutlinedIcon /></div> : <div className="seen-btn" onClick={(e) => handleSeen(e, false)}><UndoIcon /></div> : null : null}
          {!addedToWatchlist ? !isSeen ? !isNotInterested ? <div className="not-interested-btn" onClick={(e) => handleNotInterested(e, true)} ><ClearIcon /></div> : <div className="not-interested-btn" onClick={(e) => handleNotInterested(e, false)}><UndoIcon /></div> : null : null}
          {!addedToWatchlist ? null : <div className="not-interested-btn" onClick={(e) => handleWatchlist(e, false)}><UndoIcon /></div>}
        </div>
        <div className="movie-add-watchlist" ref={el => movieAdddBtn = el}>
          {show ? <div className={`add-icon ${addedToWatchlist ? 'active' : ''}`} onClick={(e) => handleWatchlist(e, true)}></div> : <div className={`add-icon ${addedToWatchlist ? 'active' : ''}`}></div>}
        </div>
      </div>
    )
  }

  if (page === 'watchlist') {
    return (
      <div className="movie-item-buttons">
        <div className="top-btns" ref={el => movieTopBtns = el}>
          {isWatchlist ? <div className="not-interested-btn" onClick={(e) => handleWatchlist(e, false)} ><ClearIcon /></div> : <div className="not-interested-btn" onClick={(e) => handleWatchlist(e, true)}><UndoIcon /></div>}
        </div>
        <div className="movie-add-watchlist" ref={el => movieAdddBtn = el} >
        </div>
      </div>
    )
  }

  if (page === 'seen') {
    return (
      <div className="movie-item-buttons">
        <div className="top-btns" ref={el => movieTopBtns = el}>
          {!isSeen ? <div className="not-interested-btn" onClick={(e) => handleRemove(e, true)} ><ClearIcon /></div> : <div className="not-interested-btn" onClick={(e) => handleRemove(e, false)} ><UndoIcon /></div>}
        </div>
        <div className="movie-add-watchlist" ref={el => movieAdddBtn = el} >
        </div>
      </div>
    )
  }
}
