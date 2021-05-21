import React from 'react';
import { motion } from 'framer-motion';

import InfiniteScroll from './InfiniteScroll';
import MovieItemLoading from './MovieItemLoading';

export default function MovieList({ length, loadNext, cols, loading, children }) {

  if (length === 0) return (
    <motion.div exit={{ opacity: 0 }} className={`mt-20 mx-32 grid grid-cols-${cols ? cols : 5} gap-4`}>
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
      <MovieItemLoading />
    </motion.div>
  )

  return (
    <InfiniteScroll loadMore={() => loadNext()} loading={loading}>
      <motion.div exit={{ opacity: 0 }} className={`mt-20 mx-32 grid grid-cols-${cols ? cols : 5} gap-4`}>
        {children}
      </motion.div>
    </InfiniteScroll>
  )
}
