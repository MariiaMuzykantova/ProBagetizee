import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login';
import Projects from '../Projects';
import Register from '../Register';
import Profile from '../Profile';
import UserContext from '../../../context/userContext';
import tokenIsValid from '../../../calls/user/tokenIsValid';
import getUserData from '../../../calls/user/getUserData';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');

      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenRes = await tokenIsValid(token);

      if (tokenRes.data) {
        const userRes = await getUserData(token);

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route path="/login/">
            <Login />
          </Route>

          <Route path="/profile/">
            <Profile />
          </Route>

          <Route path="/register/">
            <Register />
          </Route>

          <Route path="/projects/">
            <Projects />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
