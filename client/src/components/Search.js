import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import slugify from 'slugify';


import { search, getSearchResults } from '../store/search';

export default function Search({ closeModal }) {
  const [query, setQuery] = useState();
  const [searchTimeout, setSearchTimeout] = useState();

  const dispatch = useDispatch()

  const results = useSelector(getSearchResults);

  useEffect(() => {
    if (!query) return;
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchTimeout(setTimeout(() => {
      dispatch(search(query))
    }, 300));
  }, [query])

  return (
    <Fragment>
      <div className="flex items-center">
        <span className="material-icons mr-3 text-opacity-2 text-xl md:text-xxl">search</span>
        <input className="h-10 pr-3 m-0 pl-0 text-white mb-1 text-md md:text-xl w-full" type="text" name="search" placeholder="Search movies" onKeyUp={(e) => setQuery(e.target.value)} />
        <div className="hidden md:block ml-3 text-opacity-1 mb-1.5 border-grey text-xs py-0.5 px-1.5 font-medium cursor-pointer select-none" onClick={closeModal}>esc</div>
        <div className="text-opacity-1 mb-1.5 text-xs py-0.5 px-1.5 font-medium cursor-pointer select-none" onClick={closeModal}>
          <span className="material-icons">clear</span>
        </div>
      </div>
      <hr />
      <div className="mt-4">
        <h2 className="m-0 p-0 text-opacity-2 text-lg md:text-xl mb-4 font-semibold">Results</h2>
        {results.map(movie => (
          <Link to={`/movie/${movie.id}-${slugify(movie.title, { lower: true, remove: /[*+~.()'"!:@]/g })}`} onClick={closeModal}>
            <div className="flex flex-col mb-2 md:mb-4 border-grey hover:border-opacity-primary transition py-2 px-3 rounded-sm">
              <span className="font-bold text-lg md:text-xl mr-3">{movie.title}</span>
              <div className="mt-1">
                <span className="text-xs md:text-sm font-medium text-opacity-2 mr-3">{movie.year}</span>
                <span className="font-semibold text-primary border-primary-opacity py-0.5 px-1.5 text-xxs md:text-xs">{movie.vote_average}</span>
              </div>
            </div>
          </Link>
        ))}
        <hr />
      </div>
    </Fragment>
  )
}
