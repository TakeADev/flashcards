import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export default function Root() {
  const { setIsAuthenticated } = useContext(AuthContext);
  function logoutHandler() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <div className=''>
      <span onClick={logoutHandler}>Log out</span>
    </div>
  );
}
