import React, { useState } from 'react';

import StarRating from './StarRating';
import LikeBtn from './buttons/LikeBtn';
import WatchlistBtn from './buttons/WatchlistBtn';

export default function MovieButtons({ filmId, title, ui }) {
  const [rating, setRating] = useState(ui.rating || 0);
  const [watchlist, setWatchlist] = useState(ui.watchlist || false);
  const [like, setLike] = useState(ui.like || false);

  return (
    <div className="flex items-center justify-start">
      <div className="mr-6">
        <StarRating filmId={filmId} readOnly={false} rating={rating} setRating={setRating} removeWatchlist={() => setWatchlist(false)} />
      </div>
      <div className="mr-6">
        <WatchlistBtn filmId={filmId} title={title} watchlist={watchlist} setWatchlist={setWatchlist} />
      </div>
      <div>
        <LikeBtn filmId={filmId} title={title} like={like} setLike={setLike} />
      </div>
    </div>
  )
}
