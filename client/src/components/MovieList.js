import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import MovieItem from './MovieItem';
import InfiniteScroll from './InfiniteScroll';
import { loading } from '../store/movies';

export default function MovieList({ movies, loadNext, cols, page, isUserAuth }) {
  const isLoading = useSelector(loading);

  const handleLoadMore = () => {
    if (!isLoading) loadNext();
  };

  if (movies.length === 0) return <div></div>;

  return (
    <InfiniteScroll loadMore={handleLoadMore}>
      <motion.div exit={{ opacity: 0 }} className={`movies-container movies mt-20 mx-32 grid grid-cols-${cols ? cols : 5} gap-6`} data-router-view="movie">
        {movies.map((movie, i) => <MovieItem key={movie.id} movie={movie} page={page} showButtons={isUserAuth} />)}
      </motion.div>
    </InfiniteScroll>
  )
}
