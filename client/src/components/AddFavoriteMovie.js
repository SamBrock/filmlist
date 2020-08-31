import React, { useState, useRef, useEffect } from 'react';
import Placeholder from '../images/placeholder.png';
import ClearIcon from '@material-ui/icons/Clear';
import { TweenMax } from 'gsap';

export default function AddFavoriteMovie({ id, posterPath, setFavMovies, favMovies }) {
  const [dim, setDim] = useState(false);
  const [topBtns, setTopBtns] = useState(null);

  let movieTopBtns = useRef(null);

  useEffect(() => {
    setTopBtns(TweenMax.fromTo(movieTopBtns, .5, { opacity: 0, y: -10 }, { opacity: 1, y: 0 }).pause());
  }, [dim])

  if (dim && topBtns) topBtns.play();
  if (!dim && topBtns) topBtns.reverse();

  const handleRemove = () => {
    const movies = favMovies.filter(m => m.id != id);
    setFavMovies(movies);
  }

  if (!posterPath) {
    return (
      <div className="add-favorite-movie">
        <img className="placeholder-img"  src={Placeholder} />
        <div className="top-btns" ref={el => movieTopBtns = el}></div>
      </div>
    )
  } else {
    return (
      <div className="add-favorite-movie" onMouseOver={() => setDim(true)} onMouseLeave={() => setDim(false)}>
        <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${posterPath}`} style={dim ? { filter: 'brightness(50%)' } : {}}></img>
        <div className="top-btns" ref={el => movieTopBtns = el}>
          <div className="not-interested-btn" onClick={() => handleRemove()}><ClearIcon /></div>
        </div>
      </div>
    )
  }
}
