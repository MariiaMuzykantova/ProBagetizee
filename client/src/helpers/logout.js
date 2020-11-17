import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import userContext from '../context/userContext';

const logout = () => {
  const { userData, setUserData } = useContext(userContext);
  const history = useHistory();

  setUserData({
    token: undefined,
    user: undefined,
  });

  localStorage.setItem('auth-token', '');
  history.push('/login');

  return;
};

export default logout;
