import { ReactNode, SetStateAction, createContext, useEffect, useState, Dispatch } from 'react';

import { validateToken } from '../utils/auth';

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: true,
});

function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    if (userToken) {
      validateToken(userToken).then((res) => {
        if (res.token) {
          setIsLoading(false);
          return setIsAuthenticated(true);
        }
        setIsLoading(false);
        return setIsAuthenticated(false);
      });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [userToken]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
