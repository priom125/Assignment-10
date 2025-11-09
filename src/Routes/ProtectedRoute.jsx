import React, { use } from 'react'
import { AuthContext } from '../Auth/AuthProvider';
import { Navigate } from 'react-router';

const ProtectedRoute = ({children}) => {
  const {user} = use(AuthContext);
  if(user && user?.email){
    return children;
  }
  return <Navigate to="/login" replace></Navigate>;
}

export default ProtectedRoute