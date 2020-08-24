import React, { useState, Fragment } from 'react'
import { logoutUser } from '../store/auth';
import { useDispatch } from 'react-redux';


export default function ProfileButton({ username }) {
  const [hover, setHover] = useState(true);
  const usernameLetter = username.toUpperCase().charAt(0);

  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="profile-btn-container" onMouseOver={() => setHover(true)} onMouseLeave={() => setTimeout(() => setHover(false), 500)}>
        <div className="profile-btn">
          {usernameLetter}
        </div>
        <div className="profile-dropdown" style={!hover ? { display: 'none' } : {}}>
          <ul>
            <li><a onClick={() => dispatch(logoutUser())}>Logout</a></li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}
