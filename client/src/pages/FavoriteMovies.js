import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { getSearchResults } from '../store/search';
import { addMovieLike } from '../store/movie';
import { clearErrors } from '../store/error';
import FavoriteItem from '../components/FavoriteItem';
import Search from '../components/Search';
import Head from '../components/Head';
import MovieItem from '../components/MovieItem';

const StyledContainerDiv = styled(motion.div).attrs({ className: 'md:w-2/3 flex flex-col mx-3 sm:mx-6 md:mx-auto h-screen' })`
  padding-top: 90px;
`;

export default function FavoriteMovies() {
  const [favMovies, setFavMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const loadedResults = useSelector(getSearchResults);

  useEffect(() => {
    setResults(loadedResults);
  }, [loadedResults])

  useEffect(() => {
    setResults(loadedResults);
  }, [loadedResults])

  const handleAdd = (index) => {
    if (favMovies.length > 3) return;
    const movie = results[index];
    if (favMovies.some(m => m.id === movie.id) || movie.poster_path === null) return;
    setFavMovies([...favMovies, movie]);
    setResults([]);
  }

  const handleDone = () => {
    dispatch(clearErrors());
    favMovies.forEach(m => dispatch(addMovieLike(m.id)));
    setRedirect(true);
  }

  const handleRemove = (index) => {
    setFavMovies(favMovies.filter((m, i) => i !== index));
  }

  if (redirect) return <motion.div exit={{ opacity: 0 }}><Redirect to={`/`} /></motion.div>;

  return (
    <StyledContainerDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Head title="Add Your Favorite Films" />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="favorite-movies-header">
          <h1 className="text-heading font-extrabold">Add your favorite films</h1>
          <p className="text-opacity-2 leading-6">This will help us find films that you may also be interested in.</p>
          <div className="pt-2">
            {favMovies.length > 3 ?
              <button className="bg-none text-primary font-semibold h-10 flex justify-center leading-none items-center px-6 border-primary" onClick={handleDone}>Done</button> :
              <button className="bg-none text-opacity-2 font-semibold h-10 flex justify-center leading-none items-center px-6 border-grey cursor-default" disabled={true}>Add {4 - favMovies.length} films</button>
            }
          </div>
        </div>
        <div className="relative mt-12">
          <Search disableTips={true} />
          <div className="absolute w-full mt-3 z-10 bg-black">
            {results.map((movie, i) => (
              <div className="bg-black flex flex-col mb-2 md:mb-3 border-grey hover:border-opacity-primary transition py-2 px-3 rounded-sm cursor-pointer" onClick={() => handleAdd(i)}>
                <span className="font-bold text-lg md:text-xl mr-3">{movie.title}</span>
                <div className="mt-1">
                  <span className="text-xs md:text-sm font-medium text-opacity-2 mr-3">{movie.year}</span>
                  {movie.vote_average === "0.0" ? '' : <span className="font-semibold text-primary border-primary-opacity py-0.5 px-1.5 text-xxs md:text-xs">{movie.vote_average}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-4 mx-auto pb-12 mt-6 md:mt-20">
        {favMovies[0] ? <div><button className="uppercase mb-2 text-opacity-1 hover:text-opacity-2 transition" onClick={() => handleRemove(0)}>Remove</button><MovieItem movie={favMovies[0]} /></div> : <FavoriteItem />}
        {favMovies[1] ? <div><button className="uppercase mb-2 text-opacity-1 hover:text-opacity-2 transition" onClick={() => handleRemove(1)}>Remove</button><MovieItem movie={favMovies[1]} /></div> : <FavoriteItem />}
        {favMovies[2] ? <div><button className="uppercase mb-2 text-opacity-1 hover:text-opacity-2 transition" onClick={() => handleRemove(2)}>Remove</button><MovieItem movie={favMovies[2]} /></div> : <FavoriteItem />}
        {favMovies[3] ? <div><button className="uppercase mb-2 text-opacity-1 hover:text-opacity-2 transition" onClick={() => handleRemove(3)}>Remove</button><MovieItem movie={favMovies[3]} /></div> : <FavoriteItem />}
      </div>
    </StyledContainerDiv>
  )
}
