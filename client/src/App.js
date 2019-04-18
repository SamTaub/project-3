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
      username: null,
      id: null
    };
  }

  componentDidMount() {
    this.checkAuthStatus();
  }

  componentDidUpdate() {
    if (this.state.authenticated && !this.state.id) {
      userAPI
        .checkAuthStatus()
        .then(res => {
          // console.log(res);
          this.setState({
            id: res.data.id
          });
        })
        .catch(err => console.err(err));
    }
  }

  checkAuthStatus = () => {
    userAPI
      .checkAuthStatus()
      .then(res => {
        // console.log(res);
        if (res.data.isLoggedIn) {
          this.setState({
            authenticated: true,
            username: res.data.username,
            id: res.data.id
          });
        } else {
          this.setState({
            authenticated: false,
            username: null,
            id: null
          });
        }
      })
      .catch(err => console.error(err));
  };

  setUser = user => {
    this.setState(user);
  };

  logout = callback => {
    userAPI
      .logOut()
      .then(() => {
        // localStorage.removeItem("beadli");
        // window.location.replace("/");
        this.setState({
          authenticated: false,
          username: null,
          id: null
        });
        callback();
      })
      .catch(err =>
        alert(`Something went wrong logging you out (${err}). Try again!`)
      );
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
              id={this.state.id}
            />
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
              isAuthed={this.state.authenticated}
              id={this.state.id}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
