import React from 'react'
import { logoutUser } from '../../store/auth'
import { useDispatch } from 'react-redux'


export default function Logout() {
  const dispatch = useDispatch();
  return (
    <div className="nav-link">
      <a onClick={() => dispatch(logoutUser())}>Log out</a>
    </div> 
  )
}
