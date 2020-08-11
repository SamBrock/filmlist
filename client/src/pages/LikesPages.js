import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadLikes, getLikes } from '../store/likes';
import MovieItem from '../components/MovieItem';
import { start, complete } from '../store/loadingBar';

export default function LikesPage({ match }) {
  const dispatch = useDispatch();

  const username = match.params.username;
  useEffect(() => {
    dispatch(loadLikes(username))
  }, [username])

  const movies = useSelector(getLikes);

  const isLoading = useSelector(state => state.entities.likes.loading);
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
          <MovieItem key={movie.movie.id} movie={movie.movie} />
        ))}
      </div>
    </Fragment>
  )
}