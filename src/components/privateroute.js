import { useSelector} from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

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