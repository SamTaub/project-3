import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
  // Redirect
} from "react-router-dom";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Create from "./pages/Create/Create";
import Nav from "./components/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import userAPI from "./utils/userAPI";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: null
    };
  }

  componentDidMount() {
    this.checkAuthStatus();
  }

  checkAuthStatus = () => {
    userAPI
      .checkAuthStatus()
      .then(res => {
        console.log(res);
        if (res.data.isLoggedIn) {
          this.setState({
            authenticated: true,
            username: res.data.username
          });
        } else {
          this.setState({
            authenticated: false,
            username: null
          });
        }
      })
      .catch(err => console.error(err));
  };

  setUser = user => {
    this.setState(user);
  };

  logout = () => {
    userAPI.logOut().then(() => {
      localStorage.removeItem("beadli");
      window.location.replace("/");
      // return <Redirect to="/" />;
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav logout={this.logout} isAuthed={this.state.authenticated} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              render={() => <Login setUser={this.setUser} />}
            />
            <Route exact path="/signup" component={Signup} />
            <ProtectedRoute
              exact
              path="/create"
              component={Create}
              isAuthed={this.state.authenticated}
            />
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
              isAuthed={this.state.authenticated}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
