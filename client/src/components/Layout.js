import React, { useState } from 'react';

import Head from './Head';
import Header from './layout/Header';
import SearchModal from './SearchModal';

export default function Layout({ children }) {
  const [search, setSearch] = useState(false);

  window.addEventListener('keydown', (e) => {
    if (e.key === "k" && e.ctrlKey) {
      e.preventDefault();
      setSearch(true);
    };
    if (e.key === "escape") setSearch(false);
  });

  return (
    <div>
      <Head />
      <Header openSearchModal={() => setSearch(true)} />
      <SearchModal isOpen={search} close={() => setSearch(false)} />
      {children}
    </div>
  )
}
