import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.username, this.state.password);
  };

  handleSubmit = () => {};

  render() {
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
                <button type="submit" className="btn btn-light btn-lg">
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
