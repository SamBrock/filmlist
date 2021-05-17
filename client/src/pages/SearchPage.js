import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, getSearchResults } from '../store/search';
import { Link } from 'react-router-dom';
import { motion, motionValue } from 'framer-motion';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState('');

  const dispatch = useDispatch()

  const movies = useSelector(getSearchResults);

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => {
      dispatch(search(query))
    }, 300));
  }, [query, dispatch])

  document.title = `Search - FILMLIST`;
  return (
    <div className="search-container mt-96">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="search-form-container">
        <div className="search-form">
          <input type="text" name="search" placeholder="Search..." onKeyUp={(e) => setQuery(e.target.value)} />
        </div>
        <div className="search-results">
          {movies.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="result">
                <span className="movie-title">{movie.title}</span>
                <span className="movie-year">{movie.year}</span>
                <span className="movie-vote-average">{movie.vote_average}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
