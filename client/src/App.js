import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import API from "./utils/userAPI";

const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route {...rest} render={props =>
      this.state.authenticated 
      ? (<Component {...props} />)
      : (<Redirect to="/login" />)
    }
  />;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: API.checkAuthStatus().isLoggedIn }) // D O U B L E  C H E C K  T H I S
  }

  // I think we'll need to call userAPI.checkAuth() when componentDidMount so that we can check if auth status at the root level. This will then allow us to render private routes (See https://github.com/shouheiyamauchi/react-passport-example/blob/master/client/src/Main.js).

  render() {
    return (
      <Router>
        <div>
          <Nav isAuthed={this.state.authenticated} />
          <Switch>
            {/* Public Routes */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/browse" component={NoMatch} />
            <Route path="/user/profile/:id" component={NoMatch} />
            <Route path="/user/profile/published/:id" component={NoMatch} />
            <Route component={NoMatch} />

            {/* Private Routes */}
            <PrivateRoute
              path="/user/dashboard/published/:id"
              component={<h2>henlo</h2>}
            />
            <PrivateRoute
              path="/user/dashboard/drafts/:id"
              component={NoMatch}
            />
            <PrivateRoute path="/user/favorites/:id" component={NoMatch} />
            <PrivateRoute exact path="/logout" component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
