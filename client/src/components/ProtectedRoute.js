import React from "react";
import { Route, Redirect } from "react-router-dom";
// import API from "../utils/userAPI";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
