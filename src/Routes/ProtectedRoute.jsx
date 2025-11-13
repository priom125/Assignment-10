import React, { use } from 'react'
import { AuthContext } from '../Auth/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({children}) => {
  const {user} = use(AuthContext);

  const location = useLocation();
  console.log(location)

  if(user && user?.email){
    return children;
  }
  return <Navigate state={location.pathname} to="/login"  ></Navigate>;
}

export default ProtectedRoute