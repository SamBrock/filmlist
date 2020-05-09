import React, { useEffect, useState } from 'react'

export default function MovieDetailPage({ match }) {
    useEffect(() => {
        fetchMovie();
    }, [])

    const [movie, setMovie] = useState([]);

    const fetchMovie = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=f232b12b7f9ade28ae71866f4777033a&language=en-US`)
        const movie = await data.json();
        
        setMovie(movie);
    }

    return (
        <div data-router-view="movie-page">
            <h1>{movie.title}</h1>
        </div>
    )
}



