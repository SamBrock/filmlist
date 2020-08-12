import React, { Fragment, useEffect } from 'react'
import Logo from '../../images/f-logo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getUser } from '../../store/auth'
import ProfileButton from '../ProfileButton'
import Logout from '../auth/Logout';

export default function Header() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const authLinks = (
    <Fragment>
      <ProfileButton username={user ? user.username : ''}/>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <a className="auth-btn">Log In</a>
      {/* <a className="auth-btn btn-border">Register</a> */}
    </Fragment>
  )

  return (
    <header>
      <nav className="left-nav">
        <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>
        
      </nav>
      <nav className="right-nav">
        {isAuthenticated ? authLinks : guestLinks}
        {/* <Logout /> */}
      </nav>
    </header>
  )
}

