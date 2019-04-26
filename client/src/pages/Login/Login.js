import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import SimpleModal from "../../components/Modals/SimpleModal";
import userAPI from "../../utils/userAPI";
import "./style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      notification: "",
      isLoggedIn: false,
      modalShow: false
    };
  }

  componentDidMount() {
    userAPI
      .checkAuthStatus()
      .then(res => {
        this.setState({ isLoggedIn: res.data.isLoggedIn }, () => {
          if (this.state.isLoggedIn) {
            return (
              <Redirect
                to={{
                  pathname: "/dashboard"
                }}
              />
            );
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.email && this.state.password) {
      userAPI
        .logIn(this.state.email, this.state.password)
        .then(res => {
          this.setState(
            {
              isLoggedIn: true
            },
            this.props.setUser({
              authenticated: true,
              username: res.data.username
            })
          );
        })
        .catch(err => {
          if (!this.state.isLoggedIn) {
            this.setState({
              notification: `Incorrect email or password. Please try again.`,
              modalShow: true
            });
          } else {
            this.setState({
              notification: `Something went wrong when attemping to log you in. Please try again.`,
              modalShow: true
            });
          }
        });
      this.resetInputs();
      this.resetNotification();
    } else {
      this.setState({
        notification: `Please provide a username and password.`,
        modalShow: true
      });
    }
  };

  resetNotification = () => {
    this.setState({
      notification: ""
    });
  };

  resetInputs = () => {
    this.setState({
      email: "",
      password: ""
    });
  };

  modalClose = () => this.setState({ modalShow: false });

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
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
              <h1 className="mb-3">Login</h1>
              <form className="login">
                <div className="form-group">
                  <label htmlFor="email-input">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email-input"
                    name="email"
                    value={this.state.email}
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
        <SimpleModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          title="Login Error"
          body={this.state.notification}
          buttonVariant="light"
          buttonActionText="OK"
          buttonActionFunc={this.modalClose}
          // buttonRemainText="Cancel"
        />
      </Container>
    );
  }
}

export default withRouter(Login);
