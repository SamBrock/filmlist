import React, { Fragment, useState, useEffect } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsAuthenticated, getUser, logoutUser, loading } from '../../store/auth';

export default function HamburgerMenu() {
  const [show, setShow] = useState(false);
  
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);
  const isLoading = useSelector(loading);

  const links = (
    isAuthenticated ? (
      <ul>
        <li><Link to={`/${user.username}/watchlist`} onClick={() => setShow(false)}>Watchlist</Link></li>
        <li><Link to={`/${user.username}/seen`} onClick={() => setShow(false)}>Seen</Link></li>
        <li><a className="logout-btn" onClick={() => {dispatch(logoutUser()); setShow(false)}}>Logout</a></li>
      </ul>) :
      (<ul>
        <li><Link to={`/login`} onClick={() => setShow(false)}>Login</Link></li>
        <li><Link to={`/register`} onClick={() => setShow(false)}>Register</Link></li>
      </ul>)
  )

  return (
    <Fragment>
      <a className="menu-btn">
        <MenuIcon className="menu-icon" onClick={() => setShow(true)} />
      </a>
      <div className="hamburger-menu-container" style={show ? { display: 'flex' } : { display: 'none' }}>
        <div className="menu-head">
          <ClearIcon className="clear-icon" onClick={() => setShow(false)} />
        </div>
        <nav>
          {links}
        </nav>
        <Footer />
      </div>
    </Fragment>
  )
}
