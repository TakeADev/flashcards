import { useContext, ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (!isLoading) {
    return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
  }
}
