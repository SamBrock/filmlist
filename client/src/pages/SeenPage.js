import React, { useEffect } from 'react'
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
    <div className="movies-container seen" data-router-view="movie">
      {movies.map((movie) => (
        <MovieItem key={movie.movie.id} movie={movie.movie} seen={true} rating={movie.rating} like={movie.like} page="seen"/>
      ))}
    </div>
  )
}