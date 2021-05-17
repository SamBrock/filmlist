import React from 'react'
import FullLogoGrey from '../../images/filmlist-grey.svg'

export default function Footer() {
  return (
    <div className="flex mt-auto">
      <img className="h-5" src={FullLogoGrey} alt="Filmlist logo" />
      <div className="text-grey font-semibold ml-auto">&copy; {new Date().getFullYear()} <a className="font-semibold text-grey" href="https://sambrock.com">sambrock.com</a></div>
    </div>
  )
}
