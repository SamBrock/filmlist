import React, { useEffect, useRef, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

export default function InfiniteScroll({ children, loadMore }) {
  const [active, setActive] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    setTimeout(() => setActive(true), 3000);
  }, [active])

  useEffect(() => {
    if (!active) return;
    const observer = new IntersectionObserver(handleObserver, { root: null, rootMargin: "20px", threshold: 1.0 });

    if (loader.current) observer.observe(loader.current);
  }, [loader, active]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) loadMore();
  }

  return (
    <div>
      {children}
      <div className="loading mt-6 flex w-full border justify-center" ref={loader}><ClipLoader color='#fffff' size={35} /></div>
    </div>
  )
}
