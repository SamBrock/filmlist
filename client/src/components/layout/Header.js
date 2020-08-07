import React, { Fragment } from 'react'
import Logo from '../../images/f-logo.png'
import Search from '../../images/search.png'
import { Link } from 'react-router-dom'
import RegisterModal from '../auth/RegisterModal'
import LoginModal from '../auth/LoginModal'
import Logout from '../auth/Logout'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getUser } from '../../store/auth'
import ProfileBtn from '../ProfileBtn'

export default function Header() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);
  // console.log(user);

  const authLinks = (
    <Fragment>
      <ProfileBtn />
      {/* <Logout /> */}
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
        {/* <img src={Search} className="search-btn" alt="Search button" /> */}
      </nav>
      <nav className="right-nav">
        <span class="username">{isAuthenticated ? user.username : ''}</span>
        <Logout />
      </nav>
    </header>
  )
}

