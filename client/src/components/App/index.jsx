import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios"
import SignInSide from "../SignInSide";
import Projects from "../Projects";
import Register from "../Register"
import UserContext from "../../context/userContext"

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
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
          <Route path="/projects">
            <Projects />
          </Route>

          <Route path="/login">
            <SignInSide />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
