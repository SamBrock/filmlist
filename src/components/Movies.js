import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovies } from '../store/moviesList';
import MovieItem from '../components/MovieItem'

export default function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.entities.movies.list)

  useEffect(() => {
    dispatch(loadMovies());
  })

  return (
    movies.map((movie) => (
      <MovieItem key={movie.id} movie={movie} />
    ))
  )
}