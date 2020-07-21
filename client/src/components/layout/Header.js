import React, { useState } from 'react'
import Logo from '../../images/f-logo.png'
import Search from '../../images/search.png'
import { Link } from 'react-router-dom'
import RegisterModal from '../auth/RegisterModal'

export default function Header() {
  const [registerModal, setRegisterModal] = useState(false);

  const openModal = () => setRegisterModal(true);
  const closeModal = () => setRegisterModal(false);

  return (
    <header>
      <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>
      <img src={Search} className="search-btn" alt="Search button" />
      <div className="nav-link">
        <a onClick={openModal}>Register</a>
        <RegisterModal isOpen={registerModal} />
      </div>
    </header>
  )
}


