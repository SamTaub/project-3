import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

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
            {/*v ----- New additions - Please confirm ----- v*/}
            {/* NoMatch components to be replaced as they are built */}
            {/* Logout handler */}
            <Route exact path="/logout" component={NoMatch} /> 
            {/* Public browse */}
            <Route exact path="/browse" component={NoMatch} /> 
            {/* Public-view user dashboard */}
            <Route path="/user/dashboard/published/:id" component={NoMatch} />
            {/* Private-view user dashboard */}
            <Route path="/user/dashboard/drafts/:id" component={NoMatch} />
            {/* User favorites ----- public or private? */}
            <Route path="/user/favorites/:id" component={NoMatch} />
            {/* Public user profile ----- discuss private edit function */}
            <Route path="/user/profile/:id" component={NoMatch} />
            {/* Shelby might be a literal a goddess */}
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
