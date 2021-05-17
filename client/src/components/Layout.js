import React from 'react';
import styled from 'styled-components';

import Header from './layout/Header';
import SideNav from './layout/SideNav';

const StyledLayoutContainer = styled.div`
  
`;

export default function Layout({ children }) {
  return (
    <StyledLayoutContainer>
      <Header />
      <SideNav />
      {children}
    </StyledLayoutContainer>
  )
}
