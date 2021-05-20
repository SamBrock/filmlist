import React from 'react';
import { motion } from 'framer-motion';

import InfiniteScroll from './InfiniteScroll';

export default function MovieList({ movies, loadNext, cols, loading, children }) {
  return (
    <InfiniteScroll loadMore={() => loadNext()} loading={loading}>
      <motion.div exit={{ opacity: 0 }} className={`movies-container movies mt-20 mx-32 grid grid-cols-${cols ? cols : 5} gap-4`} data-router-view="movie">
        {children}
      </motion.div>
    </InfiniteScroll>
  )
}
