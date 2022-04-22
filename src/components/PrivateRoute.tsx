/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// Libraries
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

// function PrivateRoute({ component, ...rest }:any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrivateRoute({ comp: Component, ...rest }: any) {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  return (
    <Route
      {...rest}
      render={(props) => (accessToken
        ? (
          <Component {...props} />
        )
        : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ))}
    />
  );
}

export default PrivateRoute;