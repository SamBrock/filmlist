import React, { useEffect, Fragment } from 'react'
import Logo from '../../images/f-logo.png'
import Search from '../../images/search.png'
import { Link } from 'react-router-dom'
import RegisterModal from '../auth/RegisterModal'
import LoginModal from '../auth/LoginModal'
import Logout from '../auth/Logout'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getUser } from '../../store/auth'

export default function Header() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const authLinks = (
    <Fragment>
      <Logout />
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <RegisterModal />
      <LoginModal />
    </Fragment>
  )

  return (
    <header>
      <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>
      <img src={Search} className="search-btn" alt="Search button" />
      {isAuthenticated ? authLinks : guestLinks}
    </header>
  )
}


