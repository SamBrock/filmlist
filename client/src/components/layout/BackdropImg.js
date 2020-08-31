import React, { useState, useEffect } from 'react'
import { useWindowSize, usePageYOffset } from '../../hooks/window-hooks';
import { motion } from 'framer-motion'
import ProgressiveImage from 'react-progressive-image';
import { transition } from '../../transitions/transitions';

export default function BackdropImg({ backdropPath }) {
  const pageYOffset = usePageYOffset();
  const [backdropWidth, setBackdropWidth] = useState(0);
  const [backdropHeight, setBackdropHeight] = useState(0);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (pageYOffset === 0) return setBackdropHeight(height);
    setBackdropHeight(height - pageYOffset);
  })

  useEffect(() => {
    const element = document.getElementById('backdrop-placeholder');
    if (element) setBackdropWidth(element.getBoundingClientRect().width);
  }, [width, height])

  // For tablet and smaller resolutions
  if (width <= 768) {
    return (
      <div className={`backdrop-container l-grid-col`} style={{ height: backdropHeight }}>
        <ProgressiveImage src={"https://image.tmdb.org/t/p/original" + backdropPath} placeholder={"https://image.tmdb.org/t/p/w780" + backdropPath}>
          {src => <motion.img initial={{ scale: 1.1, opacity: .3 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: .3 }} transition={transition} src={src} alt={`movie backdrop`} style={{ marginTop: pageYOffset }} />}
        </ProgressiveImage>
      </div >
    )
  }

  return (
    <div className="backdrop-container l-grid-col" style={{ width: `${backdropWidth}px` }}>
      <ProgressiveImage src={"https://image.tmdb.org/t/p/original" + backdropPath} placeholder={"https://image.tmdb.org/t/p/w780" + backdropPath}>
        {src => <motion.img initial={{ scale: 1.1, opacity: .3 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: .3 }} transition={transition} src={src} alt={`movie backdrop`} />}
      </ProgressiveImage>
    </div >
  )
}
