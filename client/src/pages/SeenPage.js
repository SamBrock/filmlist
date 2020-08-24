import React, { useEffect, useState, useRef, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadSeen, getSeen, loading, moreLoading } from '../store/seen';
import MovieItem from '../components/MovieItem';
import { start, complete } from '../store/loadingBar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function SeenPage({ match }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(18);

  const dispatch = useDispatch();

  const username = match.params.username;
  useEffect(() => {
    dispatch(loadSeen(username, pageNumber, limit));
  }, [username, pageNumber])

  const movies = useSelector(getSeen);

  const isMoreLoading = useSelector(moreLoading);

  const isLoading = useSelector(loading);
  if (isLoading) {
    dispatch(start());
    return null;
  }

  document.title = `${username}'s Seen - FILMLIST`;
  dispatch(complete());
  return (
    <main>
      <InfiniteScroll dataLength={movies.length} next={() => setPageNumber(page => page + 1)} hasMore={true} endMessage={<p style={{ textAlign: 'center' }}> <b>Yay! You have seen it all</b> </p>} >
        <div className="movies-container seen" data-router-view="movie">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} rating={movie.rating} like={movie.like} page="seen" />
          ))}
        </div>
      </InfiniteScroll>
      <div style={isMoreLoading ? {} : { display: 'none' }} className="load-more-container" >
        <div className="load-more-animation">
          <div className="load-more-bar"></div>
        </div>
      </div>
    </main>
  )
}