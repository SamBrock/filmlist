import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProgressiveImage from 'react-progressive-image';

import { tmdbImageUrl, transitions } from '../../config';
import { useWindowSize, usePageYOffset } from '../../hooks/window-hooks';

export default function BackdropImg({ backdropPath, backdropRef, className }) {
  const pageYOffset = usePageYOffset();
  const [backdropWidth, setBackdropWidth] = useState(0);
  const [backdropHeight, setBackdropHeight] = useState(0);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (pageYOffset === 0) return setBackdropHeight(height);
    setBackdropHeight(height - pageYOffset);
  }, [setBackdropHeight, pageYOffset, height])

  useEffect(() => {
    if (!backdropRef.current) return;
    setBackdropWidth(backdropRef.current.offsetWidth)
  }, [width, height, setBackdropWidth, backdropRef]);

  return (
    <div className={`${className} object-cover md:fixed h-full md:h-screen overflow-hidden top-0 left-0`} style={{ width: `${backdropWidth}px` }}>
      <ProgressiveImage src={tmdbImageUrl.backdropLarge + backdropPath} placeholder={tmdbImageUrl.backdrop + backdropPath}>
        {src => <motion.img className="object-cover overflow-hidden w-full h-full filter" initial={{ scale: 1.1, opacity: .3 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }} transition={transitions.default} src={src} alt={`movie backdrop`} />}
      </ProgressiveImage>
    </div >
  )
}
