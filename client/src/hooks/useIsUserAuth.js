import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { getIsAuthenticated, getUser } from '../store/auth';

export default function useIsUserAuth(paramUsername) {
  const [isUserAuth, setIsUserAuth] = useState(false);
  
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);
  
  useEffect(() => {
    if(!user || !isAuthenticated) return setIsUserAuth(false);
    if(user.username !== paramUsername) return setIsUserAuth(false);
    return setIsUserAuth(true);
  }, [user, paramUsername, isAuthenticated])
  
  return isUserAuth;
}
