import React from 'react';

import FullLogoGrey from '../../images/filmlist-grey.svg';
import TMDbLogo from '../../images/tmdb.svg';

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full ">
      <div className="flex justify-between w-full sm:w-auto mb-2 sm:mb-0">
        <div>
          <img className="h-5" src={FullLogoGrey} alt="Filmlist logo" />
        </div>
        <a className="flex items-center ml-6" href="https://www.themoviedb.org/" target="_blank" rel="noreferrer noopener">
          <img className="h-4" src={TMDbLogo} alt="Filmlist logo" />
        </a>
      </div>
      <div className="text-grey font-bold self-start">
        &copy; {new Date().getFullYear()} <a className="font-bold text-grey" href="https://sambrock.com" target="_blank" rel="noreferrer noopener">sambrock.com</a>
      </div>
    </div>
  )
}
