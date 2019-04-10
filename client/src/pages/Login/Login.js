import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      notification: "", // We'll use this later for telling the user something (probably if there's an error with login).
      isLoggedIn: false
    };
  }

  // Might need to add a component did mount to check the user API endpoint to see if we're already logged in? Can then setState right away from false to true.

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // Call the user API endpoint with the username and password.
    // If we get back a positive response, setState to true.
    // Otherwise set the notification to something like "Incorrect username or password. Try again!"
    if (!this.state.isLoggedIn) {
      this.setState(
        {
          notification:
            "It looks like you entered the wrong username or password. Try again!"
        },
        () => {
          alert(this.state.notification);
          this.resetNotification();
          this.resetInputs();
        }
      );
    }
  };

  resetNotification = () => {
    this.setState({
      notification: ""
    });
  };

  resetInputs = () => {
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />; // We'll actually want to redirect to user's dashboard?
    }

    return (
      <Container styles="well">
        <Row styles="justify-content-center align-items-center text-center">
          <Col size="lg-10">
            <div className="card-body">
              <h1 className="mb-3">Login</h1>
              <form className="login">
                <div className="form-group">
                  <label htmlFor="username-input">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username-input"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password-input">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-input"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-light btn-lg"
                  onClick={this.handleSubmit}
                >
                  Login
                </button>
              </form>
              <p className="mt-3">
                Need an account? <Link to="/signup">Sign up</Link>.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
