import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import "./style.css";
import "./social-icons.scss";

class Devs extends Component {
  render() {
    return (
      <Container styles="well p-3">
        <div id="dev-header">
          <h1>Beadli Dev Team</h1>
        </div>
        <div id="dreamteam">
          <div className="justify-content-center p-3">
            <Link
              to="//chrisluber.com"
              className="card-text text-center"
              target="_blank"
            >
              <h2 className="text-center">Chris</h2>
            </Link>
            <div className="m-3">
              <a href="//chrisluber.com" target="_blank">
                <img
                  src={require("../../assets/images/chris.jpg")}
                  className="card-img-top rounded-circle"
                  alt="Chris"
                />
              </a>
            </div>
            <div className="social-icons">
              <div className="icon icon--linkedin">
                <a href="//www.linkedin.com/in/cluber/" target="_blank">
                  <span className="icon__name">LinkedIn</span>
                </a>
              </div>
              <div className="icon icon--github">
                <a href="//github.com/luberchris" target="_blank">
                  <span className="icon__name">GitHub</span>
                </a>
              </div>
              <div className="icon icon--portfolio">
                <a href="//chrisluber.com" target="_blank">
                  <span className="icon__name">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
          <div className="justify-content-center p-3">
            <Link
              to="//shelbyreyes.net"
              className="card-text text-center"
              target="_blank"
            >
              <h2 className="text-center">Shelby</h2>
            </Link>
            <div className="m-3">
              <a href="//shelbyreyes.net" target="_blank">
                <img
                  src={require("../../assets/images/shelby.jpeg")}
                  className="card-img-top rounded-circle"
                  alt="Shelby"
                />
              </a>
            </div>
            <div className="social-icons">
              <div className="icon icon--linkedin">
                <a href="//www.linkedin.com/in/shelbyreyes/" target="_blank">
                  <span className="icon__name">LinkedIn</span>
                </a>
              </div>
              <div className="icon icon--github">
                <a href="//github.com/sdreyes" target="_blank">
                  <span className="icon__name">GitHub</span>
                </a>
              </div>
              <div className="icon icon--portfolio">
                <a href="//shelbyreyes.net" target="_blank">
                  <span className="icon__name">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
          <div className="justify-content-center p-3">
            <Link
              to="//samtaubweb.dev"
              className="card-text text-center"
              target="_blank"
            >
              <h2 className="text-center">Sam</h2>
            </Link>
            <div className="m-3">
              <a href="//samtaubweb.dev" target="_blank">
                <img
                  src={require("../../assets/images/sam.jpeg")}
                  className="card-img-top rounded-circle"
                  alt="Sam"
                />
              </a>
            </div>
            <div className="social-icons">
              <div className="icon icon--linkedin">
                <a href="//linkedin.com/in/samtaub" target="_blank">
                  <span className="icon__name">LinkedIn</span>
                </a>
              </div>
              <div className="icon icon--github">
                <a href="//github.com/SamTaub" target="_blank">
                  <span className="icon__name">GitHub</span>
                </a>
              </div>
              <div className="icon icon--portfolio">
                <a href="//samtaubweb.dev" target="_blank">
                  <span className="icon__name">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
          <div className="justify-content-center p-3">
            <Link
              to="//kennywhitebloom.net"
              className="card-text text-center"
              target="_blank"
            >
              <h2 className="text-center">Kenny</h2>
            </Link>
            <div className="m-3">
              <a href="//github.com/calemonte" target="_blank">
                <img
                  src={require("../../assets/images/kenny.jpg")}
                  className="card-img-top rounded-circle"
                  alt="Kenny"
                />
              </a>
            </div>
            <div className="social-icons">
              <div className="icon icon--linkedin">
                <a
                  href="//www.linkedin.com/in/kenny-whitebloom"
                  target="_blank"
                >
                  <span className="icon__name">LinkedIn</span>
                </a>
              </div>
              <div className="icon icon--github">
                <a href="//github.com/calemonte" target="_blank">
                  <span className="icon__name">GitHub</span>
                </a>
              </div>
              <div className="icon icon--portfolio">
                <a href="//kennywhitebloom.net" target="_blank">
                  <span className="icon__name">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Devs;
