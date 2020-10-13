import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignInSide from "../SignInSide";
import Projects from "../Projects";
import RegisterPage from "../RegisterPage"

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <SignInSide />
          </Route>
          <Route path="/register-page">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
