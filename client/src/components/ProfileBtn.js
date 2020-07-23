import React, { useState } from 'react'
import ProfileImage from '../images/profile.svg';


export default function ProfileBtn() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div><img src={ProfileImage} height="32" width="32"></img></div>
  )
}
