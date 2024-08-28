import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
});

function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userToken = localStorage.getItem('token');

  const value = {
    validateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function validateToken(token) {
  fetch('/api/auth/verify', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({ token: token }),
  }).then((res) => {
    res.json().then((json) => {
      if (json.token) {
        return json.token;
      }
      return json.validToken;
    });
  });
}

export default AuthProvider;
