import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return children;
};
export default ProtectedRoute