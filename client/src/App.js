import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Nav from "./components/Nav";
import API from "./utils/userAPI"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthed() === true ? (
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

const isAuthed = () => {
  API.checkAuthStatus().then(res => {
    return res.data.isLoggedIn;
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  // I think we'll need to call userAPI.checkAuth() when componentDidMount so that we can check if auth status at the root level. This will then allow us to render private routes (See https://github.com/shouheiyamauchi/react-passport-example/blob/master/client/src/Main.js).

  render() {
    return (
      <Router>
        <div>
          <Nav isAuthed={this.state.authenticated} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
