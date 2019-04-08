import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import "./style.css";

function Login() {
  return (
    <Container styles="well">
      <Row styles="justify-content-center align-items-center text-center">
        <Col size="lg-10">
          <div className="card-body">
          <h1 className="mb-3">Login</h1>
            <form className="login">
              <div className="form-group">
                <label htmlFor="email-input">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email-input"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password-input">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password-input"
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

export default Login;
