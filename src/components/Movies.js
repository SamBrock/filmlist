import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMovies } from '../store/movies';
import MovieItem from '../components/MovieItem'

export default function Movies() {
  const dispatch = useDispatch();

  const movies = useSelector(state => state.entities.movies.list)

  useEffect(() => {
    dispatch(loadMovies());
  })

  return (
    <div>
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </div>
  )
}


// import React, { Component } from 'react'
// import MovieItem from './MovieItem'

// class Movies extends Component {
//   render() {
//     return this.props.movies.map((movie) => (
//       <MovieItem movie={movie} key={movie.id} genres={this.props.genres} />
//     ))
//   }
// }

// export default Movies;

