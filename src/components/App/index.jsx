import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from "../LoginPage";
import Projects from "../Projects";

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

          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
