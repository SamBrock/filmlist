import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated, getUser } from '../../store/auth';

export default function SideNav({ username }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  return (
    <div className="side-nav center">
      <SearchIcon className="search-btn icon-btn" />
      <Link to={isAuthenticated ? `/${user.username}` : `/login`}>
        <AddIcon className="watchlist-btn icon-btn" />
      </Link>
      <Link to={isAuthenticated ? `/${user.username}/likes` : `/login`}>
        <FavoriteBorderIcon className="likes-btn icon-btn" />
      </Link>
    </div>
  )
}