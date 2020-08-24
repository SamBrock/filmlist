import React, { Fragment } from 'react'
import Logo from '../../images/filmlist-f.svg'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getUser } from '../../store/auth'
import ProfileButton from '../ProfileButton'

export default function Header() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const { pathname } = useLocation();

  const authLinks = (
    <Fragment>
      <ProfileButton username={user ? user.username : ''} />
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <a className="auth-btn">Log In</a>
      {/* <a className="auth-btn btn-border">Register</a> */}
    </Fragment>
  )

    if(pathname === '/login' || pathname === '/register') {
      return (
        <header>
          <nav className="left-nav">
            <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>
    
          </nav>
        </header>
      )
    }
  
  return (
    <header>
      <nav className="left-nav">
        <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>

      </nav>
      <nav className="right-nav">
        {isAuthenticated ? authLinks : guestLinks}
        
      </nav>
    </header>
  )
}

