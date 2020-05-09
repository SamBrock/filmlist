import React, { Component } from 'react'
import MovieItem from './MovieItem'

class Movies extends Component {
    render() {
        return this.props.movies.map((movie) => (
            <MovieItem movie={movie} key={movie.id} genres={this.props.genres} />
        ))
    }
}

export default Movies;