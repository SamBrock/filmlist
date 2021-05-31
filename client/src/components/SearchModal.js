import React, { useEffect } from 'react';
import { Modal } from '@material-ui/core';
import { useSpring, animated, config } from '@react-spring/web';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { useSelector } from 'react-redux';

import Search from './Search';
import { getSearchResults } from '../store/search';

const StyledSearchModalContainerDiv = styled(animated.div)`
  width: 610px;
`;

export default function SearchModal({ isOpen, close }) {
  const [modalAnimateStyles, modalAnimate] = useSpring(() => ({ opacity: 0, config: config.stiff }));

  const results = useSelector(getSearchResults);

  useEffect(() => {
    modalAnimate.start(isOpen ? { opacity: 1, transform: `scale(1)` } : { opacity: 0, transform: `scale(0.95)` })
  }, [isOpen]);

  return (
    <Modal className="px-6 md:px-0 flex justify-center items-start mt-24 md:mt-40" style={{ outline: 0 }} open={isOpen} onClose={close} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
      <StyledSearchModalContainerDiv style={modalAnimateStyles} className="bg-black p-6 h-auto rounded-md border-">
        <Search />
        <div className="mt-4">
          <h2 className="m-0 p-0 text-opacity-2 text-lg md:text-xl mb-4 font-semibold">Results</h2>
          {results.map(movie => (
            <Link to={`/movie/${movie.id}-${slugify(movie.title, { lower: true, remove: /[*+~.()'"!:@]/g })}`} onClick={close}>
              <div className="flex flex-col mb-2 md:mb-3 border-grey hover:border-opacity-primary transition py-2 px-3 rounded-sm">
                <span className="font-bold text-lg md:text-xl mr-3">{movie.title}</span>
                <div className="mt-1">
                  <span className="text-xs md:text-sm font-medium text-opacity-2 mr-3">{movie.year}</span>
                  {movie.vote_average === "0.0" ? '' : <span className="font-semibold text-primary border-primary-opacity py-0.5 px-1.5 text-xxs md:text-xs">{movie.vote_average}</span>}
                </div>
              </div>
            </Link>
          ))}
          <hr />
        </div>
      </StyledSearchModalContainerDiv>
    </Modal>
  )
}
