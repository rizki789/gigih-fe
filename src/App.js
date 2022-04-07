import { useState } from "react";
import { formatToMinutesSecond } from "./utils/formatToMinutesSecond";
import { constants } from "./utils/constants";
import Login from "./pages/Login"
import Home from "./pages/Home"
import UserPlaylist from './components/playlist/index';
import {useSelector} from 'react-redux';
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