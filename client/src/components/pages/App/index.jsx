import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login';
import Projects from '../Projects';
import Register from '../Register';
import Profile from '../Profile';
import UserContext from '../../../context/userContext';
import ProjectContext from '../../../context/projectContext';
import tokenIsValid from '../../../calls/user/tokenIsValid';
import getUserData from '../../../calls/user/getUserData';
import ProjectPage from '../ProjectPage/ProjectPage';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [projects, setProjects] = useState([]);

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
        <ProjectContext.Provider value={{ projects, setProjects }}>
          <Switch>
            <Route path="/register/">
              <Register />
            </Route>

            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/profile/">
              <Profile />
            </Route>

            <Route path="/projects/">
              <Projects />
            </Route>

            <Route path="/project/:id">
              <ProjectPage />
            </Route>
          </Switch>
        </ProjectContext.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
