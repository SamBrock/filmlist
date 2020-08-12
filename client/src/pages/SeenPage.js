import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadSeen, getSeen } from '../store/seen';
import MovieItem from '../components/MovieItem';
import { start, complete } from '../store/loadingBar';

export default function SeenPage({ match }) {
  const dispatch = useDispatch();

  const username = match.params.username;
  useEffect(() => {
    dispatch(loadSeen(username))
  }, [username])

  const movies = useSelector(getSeen);

  const isLoading = useSelector(state => state.entities.seen.loading);
  if (isLoading) {
    dispatch(start());
    return null;
  }

  console.log(movies);

  dispatch(complete());
  return (
    <Fragment>
      {/* <h1>{username}'s likes</h1> */}
      <div className="movies-container" data-router-view="movie">
        {movies.map((movie) => (
          <MovieItem key={movie.movie.id} movie={movie.movie} rating={movie.rating} like={movie.like} />
        ))}
      </div>
    </Fragment>
  )
}