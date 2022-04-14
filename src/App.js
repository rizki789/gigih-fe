import React from 'react';
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login"
import Home from "./pages/Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/privateroute";

const App = () => {


    return (
      <ChakraProvider>
      <div className="bg-[#121212] min-h-screen">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <PrivateRoute
              path="/create-playlist"
              component={Home}
            ></PrivateRoute>
          </Switch>
        </Router>
      </div>
    </ChakraProvider>
  )

}

export default App;