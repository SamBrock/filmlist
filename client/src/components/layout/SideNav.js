import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated, getUser } from '../../store/auth';
import { motion } from 'framer-motion';

export default function SideNav() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const { pathname } = useLocation();

  if (pathname === '/login' || pathname === '/register') {
    return (
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} className="side-nav center">
        <SearchIcon className="search-btn icon-btn" />
        <AddIcon className="watchlist-btn icon-btn" />
        <VisibilityOutlinedIcon className="likes-btn icon-btn" />
      </motion.div>
    )
  }

  return (
    <motion.div animate={{ opacity: 1 }} className="side-nav center">
      <Link to={`/search`}>
        <SearchIcon className="search-btn icon-btn" />
      </Link>
      <Link to={isAuthenticated ? `/${user.username}/watchlist` : `/login`}>
        <AddIcon className="watchlist-btn icon-btn" />
      </Link>
      <Link to={isAuthenticated ? `/${user.username}/seen` : `/login`}>
        <VisibilityOutlinedIcon className="likes-btn icon-btn" />
      </Link>
    </motion.div>
  )
}