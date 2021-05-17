import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated, getUser } from '../../store/auth';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledSideNavDiv = styled(motion.div)`
  width: 41.969px;
`;

export default function SideNav() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);

  const pathname = useLocation();

  return (
    <StyledSideNavDiv animate={{ opacity: 1 }} className="fixed left-6 top-0 flex flex-col h-screen pt-20 text-center z-40">
      <Link className="block mt-16 pt-16 pb-16 text-white hover:text-primary transition" to={isAuthenticated ? `/${user.username}/watchlist` : `/login`}><span className="material-icons font-bold">search</span></Link>
      <Link className="block pt-16 pb-16 text-white hover:text-primary transition" to={isAuthenticated ? `/${user.username}/watchlist` : `/login`}><span className="material-icons font-bold">add</span></Link>
      <Link className="block pt-16 pb-16 text-white hover:text-primary transition" to={isAuthenticated ? `/${user.username}/seen` : `/login`}><span className="material-icons-outlined font-bold">check</span></Link>
    </StyledSideNavDiv>
  )
}