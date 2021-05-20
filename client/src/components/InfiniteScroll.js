import React, { useEffect, useRef, useState } from 'react';
import { css } from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';

const BarLoaderStyles = css`
    background-color: var(--opacity-1);
    .css-sqdys8 { background-color: var(--white); }
    .css-ps9j9u { background-color: var(--white); }
`;

export default function InfiniteScroll({ children, loadMore, loading }) {
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
      <div className="flex items-center py-6">
        <div className="h-5" ref={loader} />
        {loading && (<div className="loading flex w-full border justify-center" ><BarLoader loading={loading} css={BarLoaderStyles} size={25} /></div>)}
      </div>
    </div>
  )
}
