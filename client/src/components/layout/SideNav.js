import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated, getUser } from '../../store/auth';

export default function SideNav() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const { pathname } = useLocation();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <div className="side-nav center">
      <Link to={`/search`}>
        <SearchIcon className="search-btn icon-btn" />
      </Link>
      <Link to={isAuthenticated ? `/${user.username}/watchlist` : `/login`}>
        <AddIcon className="watchlist-btn icon-btn" />
      </Link>
      <Link to={isAuthenticated ? `/${user.username}/seen` : `/login`}>
        <VisibilityOutlinedIcon className="likes-btn icon-btn" />
      </Link>
    </div>
  )
}