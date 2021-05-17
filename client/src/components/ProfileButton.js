import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux';

import { logoutUser } from '../store/auth';

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
      <div className="rounded-full h-10 w-10 bg-grey flex justify-center items-center" onMouseOver={() => setHover(true)} onMouseLeave={() => handleMouseLeave()}>
        <div className="font-bold uppercase text-xl"> {usernameLetter} </div>
        {/* <div className="profile-dropdown" style={!hover ? { display: 'none' } : {}} onMouseOver={() => { setHover(true); clearTimeout(timeout) }} onMouseLeave={() => setHover(false)}>
          <ul>
            <li><div className="link" onClick={() => dispatch(logoutUser())}>Logout</div></li>
          </ul>
        </div> */}
      </div>
    </Fragment>
  )
}
