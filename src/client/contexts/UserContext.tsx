import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

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

  if (userToken) {
  }

  const value = {
    currentUserDoc,
    setCurrentUserDoc,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
