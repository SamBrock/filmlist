import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { getIsAuthenticated, getUser } from '../../store/auth'
import { useHasScrolled, useWindowSize } from '../../hooks/window-hooks'
import ProfileButton from '../ProfileButton'
import HamburgerMenu from './HamburgerMenu'
import Logo from '../../images/filmlist-f.svg'

export default function Header() {
  const hasScrolled = useHasScrolled();
  const [width, height] = useWindowSize();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const { pathname } = useLocation();

  const authLinks = <ProfileButton username={user ? user.username : ''} />

  const guestLinks = <Link className={`${pathname === '/login' || pathname === '/register' ? 'hidden' : ''}`} to={`/login`}>Log in</Link>

  // if (pathname === '/login' || pathname === '/register') {
  //   return (
  //     <header className={`${hasScrolled ? 'active' : ''}`}>
  //       <nav className="flex items-center">
  //         <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>
  //       </nav>
  //     </header>
  //   )
  // }

  return (
    <header className={`fixed top-0 flex w-full p-6 z-50 bg-blend-exclusion ${hasScrolled ? 'active' : ''}`}>
      <nav className="flex justify-between items-center w-full select-none cursor-pointer">
        <Link to="/"><img src={Logo} className="cursor-pointer h-14" alt="Logo" /></Link>
        {isAuthenticated ? authLinks : guestLinks}
        {/* {width <= 768 ? <HamburgerMenu /> : null} */}
      </nav>
    </header>
  )
}

