import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store  from './store';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/header';

function App() {
  return (
    <ChakraProvider>
      <div className="bg-[#121212] min-h-screen">
      <Provider store={store}>
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
      </Provider>
      </div>
    </ChakraProvider>
  );
}

export default App;
