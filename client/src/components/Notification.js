import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring';

const springConfig = { velocity: 5, clamp: true, tension: 200 };

export default function Notification({ id, msg }) {
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState();

  const [animateStyles, animate] = useSpring(() => ({ transform: `translateY(100px)`, config: springConfig }))

  useEffect(() => {
    setVisible(true);
    setAnimating(true);
    setTimeout(() => setVisible(false), 3000);
    setTimeout(() => setAnimating(false), 4000);
  }, []);

  useEffect(() => {
    animate.start({ opacity: visible ? 1 : 0, transform: `translateY(0px)` });
  }, [visible]);

  return (
    <animated.div style={animateStyles} className={`${id === 'ADD' ? 'bg-primary text-black' : 'bg-grey text-opacity-2'} ${animating ? 'block' : 'hidden'} flex items-center p-3 mt-2 w-auto`}>
      { id === 'ADD' && (<span className="material-icons font-bold text-xl mr-2">add</span>)}
      { id === 'DELETE' && (<span className="material-icons font-bold text-xl mr-2">clear</span>)}
      {msg}
    </animated.div>
  )
}
