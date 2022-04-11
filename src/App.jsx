import React from 'react';
import Login from "./pages/Login"
import Home from "./pages/Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/privateroute";

const App = () => {


    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <PrivateRoute exact path="/create-playlist" component={Home} />
        </Switch>
      </Router>
      </div>
  )

}

export default App;