import React from "react";
import { Route, Redirect } from "react-router-dom";
// import API from "../utils/userAPI";

function ProtectedRoute({ component: Component, isAuthed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? (
          <Component {...props} {...rest} />
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
