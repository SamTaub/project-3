import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import userAPI from "../../utils/userAPI";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      notification: "",
      isLoggedIn: false
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // Post to api/signup with the new user's details.
    // If the request is successful, set the logged in status to true.
    // If the request is not successful, set the logged in status to false and display some sort of notification.
    // The code below will be contained within the .then of the call. The notification will be an error message.

    console.log(this.state.username, this.state.email, this.state.password)

    userAPI.signUp(this.state.username, this.state.email, this.state.password)
      .then(res => this.setState({ isLoggedIn: true }))
      .catch(err => alert("It looks like something went wrong. Try signing up again!"));
    this.setState({
      username: "",
      email: "",
      password: ""
    })
    console.log(this.state.isLoggedIn);

// *** Commenting this out for now because setState is an asynchronous function. There is a way to only run this code once 
// *** userAPI.signUp has finished resolving, but that will need to be on our to-do list
        // if (!this.state.isLoggedIn) {
        //   this.setState(
        //     {
        //       notification:
        //         "It looks like something went wrong. Try signing up again!"
        //     },
        //     () => {
        //       alert(this.state.notification);
        //       this.resetNotification();
        //       this.resetInputs();
        //     }
        //   );
        // }
  };

  resetNotification = () => {
    this.setState({
      notification: ""
    });
  };

  resetInputs = () => {
    this.setState({
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Container styles="well">
        <Row styles="justify-content-center align-items-center text-center">
          <Col size="lg-10">
            <div className="card-body">
              <h1 className="mb-3">Sign Up</h1>
              <form className="signup">
                <div className="form-group">
                  <label htmlFor="username-input">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username-input"
                    name="username"
                    value={this.username}
                    onChange={this.handleInputChange}
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email-input">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email-input"
                    name="email"
                    value={this.email}
                    onChange={this.handleInputChange}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password-input">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-input"
                    name="password"
                    value={this.password}
                    onChange={this.handleInputChange}
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-light btn-lg"
                  onClick={this.handleSubmit}
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;
