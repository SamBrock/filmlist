import React, { useState, Fragment } from 'react'
import { logoutUser } from '../store/auth';
import { useDispatch } from 'react-redux';


export default function ProfileButton({ username }) {
  const [hover, setHover] = useState(false);
  const usernameLetter = username.toUpperCase().charAt(0);

  const dispatch = useDispatch();

  let timeout;
  const handleMouseLeave = () => {
    timeout = setTimeout(() => setHover(false), 500)
  }

  return (
    <Fragment>
      <div className="profile-btn-container" onMouseOver={() => setHover(true)} onMouseLeave={() => handleMouseLeave()}>
        <div className="profile-btn">
          {usernameLetter}
        </div>
        <div className="profile-dropdown" style={!hover ? { display: 'none' } : {}} onMouseOver={() => { setHover(true); clearTimeout(timeout) }} onMouseLeave={() => setHover(false)}>
          <ul>
            <li><div className="link" onClick={() => dispatch(logoutUser())}>Logout</div></li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}
