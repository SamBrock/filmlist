import React from 'react'
import { Fragment } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import Logo from '../../images/filmlist-f.svg'
import { getIsAuthenticated, getUser } from '../../store/auth'
import ProfileButton from '../ProfileButton'

const StyledSearchLink = styled.div`
  &:hover {
    color: var(--white);
    span {color: var(--white)}
  }
`;

export default function Header({ openSearchModal }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const authLinks = (
    <Fragment>
      <Link className="block line-height-full uppercase tracking-wide text-opacity-2 hover:text-white transition p-1 mr-3 sm:mr-6" to={isAuthenticated ? `/${user.username}/watchlist` : `/login`}><span className="line-height-full material-icons font-bold text-xxl">add</span></Link>
      <Link className="block line-height-full uppercase tracking-wide text-opacity-2 hover:text-white transition p-1 mr-3 sm:mr-6" to={isAuthenticated ? `/${user.username}/seen` : `/login`}><span className="line-height-full material-icons font-bold text-xxl">check</span></Link>
      <ProfileButton username={user ? user.username : ''} />
    </Fragment>
  )

  const guestLinks = <Link className={`ml-auto`} to={`/login`}><button className="bg-none text-primary font-semibold h-10 flex justify-center leading-none items-center px-6 border-primary">Log in</button></Link>

  return (
    <header className="fixed top-0 flex w-full px-3 sm:px-6 py-6 z-50">
      <nav className="flex items-center xl:items-start w-full select-none">
        <Link to="/"><img src={Logo} className="cursor-pointer h-10 xl:h-16" alt="Logo" /></Link>
        <div className="ml-auto flex items-center">
          <StyledSearchLink className="ml-10 p-1 mr-3 sm:pr-6 sm:mr-1 md:mr-6 flex items-center text-opacity-1 transition cursor-pointer" onClick={openSearchModal}>
            <div className="text-lg flex items-center">
              <span className="material-icons mr-0 md:mr-3 line-height-full text-xxl font-semibold text-opacity-2 mt-1 hover:text-white transition">search</span>
              <span className="hidden md:block">Quick search</span>
            </div>
            <div className="hidden md:block ml-3 text-opacity-1 mb-1.5 border-grey text-xs py-0.5 px-1.5 font-medium mt-2">Ctrl K</div>
          </StyledSearchLink>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    </header>
  )
}

