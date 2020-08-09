import React from 'react'

export default function ProfileButton({ username }) {
  const usernameLetter = username.toUpperCase().charAt(0);

  return (
    <div className="profile-btn">
      {usernameLetter}
    </div>
  )
}
