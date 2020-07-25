import React from 'react'
import Logo from '../../images/f-logo.png'
import Search from '../../images/search.png'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="left-nav">
      <Link to="/"><img src={Logo} className="logo" alt="Logo" /></Link>
      <img src={Search} className="search-btn" alt="Search button" />
    </nav>
  )
}


