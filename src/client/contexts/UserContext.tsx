import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

import { User } from '../../../lib/definitions';

interface IUserContext {
  currentUserDoc: User.ClientUser | null;
  setCurrentUserDoc: Dispatch<SetStateAction<User.ClientUser | null>>;
}

interface Props {
  children?: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  currentUserDoc: null,
  setCurrentUserDoc: () => {},
});

const userToken = localStorage.getItem('token');

function UserProvider({ children }: Props) {
  const [currentUserDoc, setCurrentUserDoc] = useState<User.ClientUser | null>(null);

  async function getUserDoc(token: string) {
    const res = await fetch('/api/users/getuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      referrer: 'no-referrer',
      body: JSON.stringify({ token: token }),
    });
    return res.json();
  }

  useEffect(() => {
    if (userToken) {
      try {
        getUserDoc(userToken).then((res) => {
          setCurrentUserDoc(res.user);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [userToken]);

  const value = {
    currentUserDoc,
    setCurrentUserDoc,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export default UserProvider;
