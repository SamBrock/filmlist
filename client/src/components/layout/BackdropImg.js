import React, { useState, useEffect } from 'react'
import { useWindowSize } from '../../hooks/window-hooks';
import { motion } from 'framer-motion'
import ProgressiveImage from 'react-progressive-image';

const transition = { ease: [0.43, 0.13, 0.23, 0.96] }

export default function BackdropImg({ backdropPath }) {
  const [backdropWidth, setBackdropWidth] = useState(0);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const element = document.getElementById('backdrop-placeholder');
    if (element) setBackdropWidth(element.getBoundingClientRect().width);
  }, [width, height])

  return (
    <div className="backdrop-container l-grid-col" style={{ width: `${backdropWidth}px` }}>
      <ProgressiveImage src={"https://image.tmdb.org/t/p/original" + backdropPath} placeholder={"https://image.tmdb.org/t/p/w780" + backdropPath}>
        {src => <motion.img initial={{ scale: 1.1, opacity: .3 }} animate={{ scale: 1, opacity: 1  }} exit={{ scale: 1.1, opacity: .3 }} transition={transition} src={src} alt={`movie backdrop`} />}
      </ProgressiveImage>
    </div >
  )
}
