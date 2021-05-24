import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import InfiniteScroll from './InfiniteScroll';
import MovieItemLoading from './MovieItemLoading';
import { useWindowSize } from '../hooks/window-hooks';
import { breakpoints } from '../styles/mixins';

const StyledMovieListDiv = styled(motion.div).attrs({ className: 'grid gap-2 sm:gap-4 mx-3 sm:mx-6 md:mx-auto' })`
  margin-top: 90px;

  ${props => props.theme.mixins.movieGrid(props.cols)}
  ${props => props.theme.mixins.width}
`;

export default function MovieList({ length, loadNext, cols, loading, children, showUserRating }) {
  if (length === 0) return (
    <StyledMovieListDiv exit={{ opacity: 0 }} cols={cols || 5}>
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
      <MovieItemLoading showUserRating={showUserRating} />
    </StyledMovieListDiv>
  )

  return (
    <InfiniteScroll loadMore={() => loadNext()} loading={loading}>
      <StyledMovieListDiv exit={{ opacity: 0 }} cols={cols || 5}>
        {children}
      </StyledMovieListDiv>
    </InfiniteScroll>
  )
}
