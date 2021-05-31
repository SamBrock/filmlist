import React, { useState } from 'react'
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
    <div className="relative" onMouseOver={() => setHover(true)} onMouseLeave={() => handleMouseLeave(false)}>
      <div className="rounded-full h-10 w-10 bg-grey flex justify-center items-center" >
        <div className="font-bold uppercase text-xl"> {usernameLetter} </div>
      </div>
      <div className={`absolute right-0 mt-3 bg-black border-grey w-44 ${hover ? 'block' : 'hidden'}`}  onMouseOver={() => {clearTimeout(timeout); setHover(true);}} onMouseLeave={() => setHover(false)}>
        <div className="p-2">
          <div className="flex items-center py-1 pl-1 pr-3 font-medium cursor-pointer text-opacity-2 hover:text-white transition" onClick={() => dispatch(logoutUser())}>
            <span className="material-icons text-lg text-opacity-2 mr-4">logout</span> Logout
          </div>
        </div>
      </div>
    </div>
  )
}
