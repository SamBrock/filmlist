import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'

import WatchlistBtn from './buttons/WatchlistBtnMain';
import NotInterestedBtn from './buttons/NotInterestedBtn';
import SeenBtn from './buttons/SeenBtn';
import WatchlistRemoveBtn from './buttons/WatchlistRemoveBtn';
import SeenRemoveBtn from './buttons/SeenRemoveBtn';

export default function MovieItemButtons({ page, id, title, show, disable }) {
  const [notInterested, setNotInterested] = useState(false);
  const [seen, setSeen] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  const config = { velocity: 0, clamp: true, tension: 150 };

  const [topButtonAnimateStyles, topButtonAnimate] = useSpring(() => ({ opacity: 0, transform: `blur(2px)`, config: config }));
  const [addButtonAnimateStyles, addButtonAnimate] = useSpring(() => ({ opacity: 0, filter: `blur(2px)`, config: config }));

  useEffect(() => {
    topButtonAnimate.start({ opacity: show ? 1 : 0, transform: show ? `blur(0px)` : `blur(5px)` });
    addButtonAnimate.start({ opacity: show ? 1 : 0, filter: show ? `blur(0px)` : `blur(5px)` })
  }, [show, topButtonAnimate, addButtonAnimate]);

  if(disable) return <div></div>;

  if (page === 'movies') return (
    <div className={`${show ? '' : 'hidden'}`}>
      <animated.div style={topButtonAnimateStyles} className="z-50 absolute top-6 left-6">
        <SeenBtn id={id} title={title} seen={seen} setSeen={setSeen} hide={notInterested} />
      </animated.div>
      <animated.div style={topButtonAnimateStyles} className="z-50 absolute top-6 right-6">
        <NotInterestedBtn id={id} title={title} notInterested={notInterested} setNotInterested={setNotInterested} hide={seen} />
      </animated.div>
      <animated.div style={addButtonAnimateStyles} className="z-40 absolute w-full h-full top-0 left-0 flex justify-center items-center">
        <WatchlistBtn id={id} title={title} watchlist={watchlist} setWatchlist={setWatchlist} />
      </animated.div>
    </div>
  )

  if (page === 'watchlist') return (
    <div className={`${show ? '' : 'hidden'}`}>
      <div className="z-50 absolute top-6 right-6">
        <WatchlistRemoveBtn id={id} title={title} />
      </div>
    </div>
  )

  if (page === 'seen') return (
    <div className={`${show ? '' : 'hidden'}`}>
      <div className="z-50 absolute top-6 right-6">
        <SeenRemoveBtn id={id} title={title} />
      </div>
    </div>
  )

  return <div></div>;
}
