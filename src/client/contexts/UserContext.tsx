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
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrer: 'no-referrer',
      body: token,
    });
    return res.json();
  }

  useEffect(() => {
    if (userToken) {
      console.log(userToken);
      try {
        getUserDoc(userToken).then((res) => {
          setCurrentUserDoc(res.user);
        });
      } catch (error) {
        console.log(error);
      }
      console.log(currentUserDoc);
    }
  });

  const value = {
    currentUserDoc,
    setCurrentUserDoc,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
