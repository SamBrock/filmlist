import React, { useRef, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


export default function Carousel(props) {
  const carousel = useRef(null);

  function next() {
    carousel.current.next();
  }

  function prev() {
    carousel.current.prev();
  }

  return (
    <div className="movie-credits">
      <div className="movie-cast-header">
        <h3>Cast</h3>
        <div>
          <IconButton aria-label="delete" disableFocusRipple={true} disableRipple={true} classes={{ label: 'carousel-btn' }} onClick={prev} >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton aria-label="delete" disableFocusRipple={true} disableRipple={true} classes={{ label: 'carousel-btn' }} onClick={next}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
      <div className="movie-credits-list">
        <OwlCarousel className="owl-theme" margin={24} dots={false} slideBy={3} ref={carousel}>
          {props.cast.map(member => (
            <div className="movie-credit">
              <div className="movie-credit-img">
                {member.profile_path !== null ?
                  <img src={`https://image.tmdb.org/t/p/w138_and_h175_face${member.profile_path}`} /> :
                  <div className="no-profile"></div>}
              </div>
              <div className="movie-credit-name">{member.name}</div>
              <div className="movie-credit-role">{member.character}</div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  )
}
