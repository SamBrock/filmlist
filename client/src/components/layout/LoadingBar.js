import React from 'react';
import LoadingBarTop from 'react-top-loading-bar';
import { useSelector, useDispatch } from 'react-redux';

export default function LoadingBar() {
  const dispatch = useDispatch();
  
  const loadingBarProgress = useSelector(state => state.entities.loadingbar.loadingBarProgress);

  return (
      <LoadingBarTop progress={loadingBarProgress} height={1} />
  )
}
