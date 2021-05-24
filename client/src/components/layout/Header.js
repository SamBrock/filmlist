import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import Logo from '../../images/filmlist-f.svg'
import { getIsAuthenticated, getUser } from '../../store/auth'
import ProfileButton from '../ProfileButton'

export default function Header() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const { pathname } = useLocation();

  const authLinks = (
    <nav className="flex items-center">
      <Link className="block line-height-full uppercase tracking-wide text-opacity-2 hover:text-white transition p-1 mr-6" to={isAuthenticated ? `/${user.username}/watchlist` : `/login`}><span className="line-height-full material-icons font-bold text-xxl">add</span></Link>
      <Link className="block line-height-full uppercase tracking-wide text-opacity-2 hover:text-white transition p-1 mr-6" to={isAuthenticated ? `/${user.username}/seen` : `/login`}><span className="line-height-full material-icons font-bold text-xxl">check</span></Link>
      <ProfileButton username={user ? user.username : ''} />
    </nav>
  )

  const guestLinks = <Link className={``} to={`/login`}><button className="bg-none text-primary font-semibold h-10 flex justify-center leading-none items-center px-6 border-primary">Log in</button></Link>

  return (
    <header className={`fixed top-0 flex w-full px-3 sm:px-6 py-6 z-50`}>
      <nav className="flex items-center xl:items-start w-full select-none cursor-pointer">
        <Link to="/"><img src={Logo} className="cursor-pointer h-10 xl:h-16" alt="Logo" /></Link>
        <div className="ml-auto flex ">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    </header>
  )
}

