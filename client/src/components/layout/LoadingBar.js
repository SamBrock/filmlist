import React from 'react';
import LoadingBarTop from 'react-top-loading-bar';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledLoadingBarContainer = styled.div`
  .styles_loading-bar__13vNf {
    background: var(--primary) !important;
  }
`;

export default function LoadingBar() {
  const loadingBarProgress = useSelector(state => state.entities.loadingbar.loadingBarProgress);

  return (
    <StyledLoadingBarContainer className="fixed top-0 z-50">
      <LoadingBarTop progress={loadingBarProgress} height={1} />
    </StyledLoadingBarContainer>
  )
}
