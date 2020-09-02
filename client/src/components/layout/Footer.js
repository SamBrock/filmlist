import React from 'react'
import FullLogoGrey from '../../images/filmlist-grey.svg'
import GitHub from '../../images/social/github.svg'
import Dribbble from '../../images/social/dribbble.svg'
import Twitter from '../../images/social/twitter.svg'
import LinkedIn from '../../images/social/linkedin.svg'
import MyLogo from '../../images/s-logo-full.svg'
import moment from 'moment';

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <img src={FullLogoGrey} alt="Filmlist logo" />
        <div className="footer-social-links">
          <a href="https://github.com/SamBrock" className="social-link"><img src={GitHub} alt="GitHub link" /></a>
          <a href="https://www.linkedin.com/in/sam-brocklehurst/" className="social-link"><img src={LinkedIn} alt="LinkedIn link" /></a>
          <a href="https://dribbble.com/sambrock" className="social-link"><img src={Dribbble} alt="Dribbble link" /></a>
          <a href="https://twitter.com/SxmBrock" className="social-link"><img src={Twitter} alt="Twitter link" /></a>
          <a href="https://sambrock.net" className="social-link"><img src={MyLogo} alt="Portfolio link" /></a>
        </div>
      </div>
      <div className="footer-copyright">&copy; {moment().year()} <a href="https://sambrock.net">sambrock.net</a></div>
    </div>
  )
}
