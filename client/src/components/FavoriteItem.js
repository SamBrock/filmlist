import React, { useState, useRef, useEffect } from 'react';

import Add from '../images/add-outline.svg';

export default function FavoriteItem() {
  const [height, setHeight] = useState(0);

  const divRef = useRef();

  useEffect(() => {
    if (!divRef.current) return;
    
    setHeight(divRef.current.offsetWidth / 100 * 150);
  }, [divRef])


  return (
    <div className="mt-7 border-default flex items-center justify-center w-full mx-auto" style={{ height }} ref={divRef}>
      <img src={Add} alt="" className="opacity-10 w-1/2" />
    </div>
  )
}
