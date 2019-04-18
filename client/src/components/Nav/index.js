import React, { Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./style.css";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Beadli
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/browse">
              Browse
            </Link>
          </li>
          {props.isAuthed ? (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Create
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  My Account
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() =>
                      props.logout(() => (
                        <Redirect
                          to={{
                            pathname: "/",
                            state: { from: props.location }
                          }}
                        />
                      ))
                    }
                    to="#"
                  >
                    Logout
                  </Link>
                </div>
              </li>
            </Fragment>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
