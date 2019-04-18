import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
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
      isSignedUp: false
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

    // console.log(this.state.username, this.state.email, this.state.password);

    userAPI
      .signUp(this.state.username, this.state.email, this.state.password)
      .then(res => this.setState({ isSignedUp: true }))
      .catch(err =>
        alert(`It looks like something went wrong (${err}). Try signing up again!`)
      );
    this.setState({
      username: "",
      email: "",
      password: ""
    });
    // console.log(this.state.isSignedUp);
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
    if (this.state.isSignedUp) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />
      );
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

export default withRouter(Signup);
