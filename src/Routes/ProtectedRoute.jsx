import { Navigate } from 'react-router';
import { useAuth } from '../Auth/AuthProvider';


export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}