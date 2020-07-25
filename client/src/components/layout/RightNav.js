import React, { Fragment } from 'react'
import RegisterModal from '../auth/RegisterModal'
import LoginModal from '../auth/LoginModal'
import Logout from '../auth/Logout'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getUser } from '../../store/auth'
import ProfileBtn from '../ProfileBtn'

export default function RightNav() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const authLinks = (
    <Fragment>
      <ProfileBtn />
      {/* <Logout /> */}
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <a className="auth-btn">Log In</a>
      <a className="auth-btn btn-border">Register</a>
      
      {/* <RegisterModal />
      <LoginModal /> */}
    </Fragment>
  )

  return (
    <nav className="right-nav">
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  )
}


