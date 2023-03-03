import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../store/hooks';
import { selectAuth } from '../features/auth/authSlice';
import { history } from '../helpers/history';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAppSelector(selectAuth);
  if (!isLoggedIn) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
