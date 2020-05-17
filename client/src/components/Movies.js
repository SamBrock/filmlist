import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovies, getMovies } from '../store/movies';
import MovieItem from '../components/MovieItem'

export default function Movies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMovies());
  })

  const movies = useSelector(getMovies);

  return (
    movies.map((movie) => (
      <MovieItem key={movie.id} movie={movie} />
    ))
  )
}