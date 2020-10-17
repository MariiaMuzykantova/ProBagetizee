import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInSide from "../SignInSide";
import Projects from "../Projects";
import Register from "../Register"

const App = () => {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  );
};

export default App;
