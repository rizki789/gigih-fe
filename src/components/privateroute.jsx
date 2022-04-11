import { useSelector} from "react-redux";
import React from 'react';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ... rest }) => {
    const accessToken = useSelector((state) => state.token.token);

    return (
        <Route
        { ... rest}
        render={(props) =>
            accessToken ? (
                <Component { ... props} />
            ) : (
              <Redirect
                to={{
                    pathname: "/",
                }}
            />
        )
      }   
    />
  );
};

export default PrivateRoute;