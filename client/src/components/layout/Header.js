import React, { Fragment, useState, useEffect } from 'react'
import Logo from '../../images/filmlist-f.svg'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getUser } from '../../store/auth'
import ProfileButton from '../ProfileButton'
import { useHasScrolled, useWindowSize } from '../../hooks/window-hooks'
import HamburgerMenu from './HamburgerMenu'

export default function Header() {
  const hasScrolled = useHasScrolled();
  const [width, height] = useWindowSize();

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
      <Link className="btn-white login-btn" to={`/login`}>Login</Link>
      {/* <a className="auth-btn btn-border">Register</a> */}
    </Fragment>
  )

  if (pathname === '/login' || pathname === '/register') {
    return (
      <header className={`${hasScrolled ? 'active' : ''}`}>
        <nav className="left-nav">
          <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>
        </nav>
      </header>
    )
  }

  return (
    <header className={`${hasScrolled ? 'active' : ''}`}>
      <nav className="left-nav">
        <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>

      </nav>
      <nav className="right-nav">
        {isAuthenticated ? authLinks : guestLinks}
        {width <= 768 ? <HamburgerMenu /> : null}
      </nav>
    </header>
  )
}

