import React, { useEffect, useState } from 'react';

import WatchlistBtn from './buttons/WatchlistBtnMain';
import NotInterestedBtn from './buttons/NotInterestedBtn';
import SeenBtn from './buttons/SeenBtn';
import WatchlistRemoveBtn from './buttons/WatchlistRemoveBtn';
import SeenRemoveBtn from './buttons/SeenRemoveBtn';

export default function MovieItemButtons({ page, id, title, show, disable }) {
  const [notInterested, setNotInterested] = useState(false);
  const [seen, setSeen] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  useEffect(() => {
    if (!watchlist) return;
    setTimeout(() => {
      disable(true);
    }, [1000]);
  }, [disable, watchlist]);

  if (page === 'movies') return (
    <div className={`${show ? '' : 'hidden'}`}>
      <div className="z-50 absolute top-6 left-6">
        <SeenBtn id={id} title={title} seen={seen} setSeen={setSeen} hide={notInterested} />
      </div>
      <div className="z-50 absolute top-6 right-6">
        <NotInterestedBtn id={id} title={title} notInterested={notInterested} setNotInterested={setNotInterested} hide={seen} />
      </div>
      <div className="z-40 absolute w-full h-full top-0 left-0 flex justify-center items-center">
        <WatchlistBtn id={id} title={title} watchlist={watchlist} setWatchlist={setWatchlist} />
      </div>
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
