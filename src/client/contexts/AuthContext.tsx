import { ReactNode, createContext, useEffect, useState } from 'react';

import { validateToken } from '../utils/auth';

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isLoading: true,
});

function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    userToken &&
      validateToken(userToken).then((res) => {
        if (res.token) {
          setIsLoading(false);
          return setIsAuthenticated(true);
        }
        setIsLoading(false);
        return setIsAuthenticated(false);
      });
  }, [userToken]);

  const value = {
    isAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
