import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/header';

function App() {
  return (
    <ChakraProvider>
      <div className="bg-[#121212] min-h-screen">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <PrivateRoute
              path="/create-playlist"
              component={Home}
            />
          </Switch>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
