import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { search } from '../store/search';

export default function Search({ closeModal, disableTips }) {
  const [query, setQuery] = useState();
  const [searchTimeout, setSearchTimeout] = useState();

  const dispatch = useDispatch()

  useEffect(() => {
    if (!query) return;
    if (searchTimeout) clearTimeout(searchTimeout);

    setSearchTimeout(setTimeout(() => {
      dispatch(search(query))
    }, 300));
  }, [query]);

  return (
    <Fragment>
      <div className="flex items-center">
        <span className="material-icons mr-3 text-opacity-2 text-xl md:text-xxl">search</span>
        <input autoFocus className="h-10 pr-3 m-0 pl-0 text-white mb-1 text-md md:text-xl w-full" type="text" name="search" placeholder="Search movies" onKeyUp={(e) => setQuery(e.target.value)} />
        {!disableTips && (
          <Fragment>
            <div className="hidden md:block ml-3 text-opacity-1 mb-1.5 border-grey text-xs py-0.5 px-1.5 font-medium cursor-pointer select-none" onClick={closeModal}>esc</div>
            <div className="text-opacity-1 mb-1.5 text-xs py-0.5 px-1.5 font-medium cursor-pointer select-none block md:hidden" onClick={closeModal}>
              <span className="material-icons text-opacity-2 text-xl mt-1">clear</span>
            </div>
          </Fragment>
        )}
      </div>
      <hr />
    </Fragment>
  )
}
