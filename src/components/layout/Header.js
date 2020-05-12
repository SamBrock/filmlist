import React, { Component } from 'react'
import Logo from '../../images/f-logo.png'
import Search from '../../images/search.png'

export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <img src={Logo} className="logo" alt="Logo" />
          <img src={Search} className="search-btn" alt="Search button" />
        </header>
      </React.Fragment>
    )
  }
}

