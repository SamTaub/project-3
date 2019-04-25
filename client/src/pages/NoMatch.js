import React from "react";
import { Link } from "react-router-dom";
import {Container, Row } from "../components/Grid";

function NoMatch() {
    return (
        <Container className="bg-transparent p-5">
          <Row styles="justify-content-center align-items-center text-center text-white">
            <div className="col-12 text-center">
              <h1 style={{fontFamily: "Beadli", fontSize: "10em"}}>404</h1>
              <h1>Page Not Found</h1>
              <br/>
              <Link to="/" className="btn btn-lg btn-outline-light">Back to Home</Link>
            </div>
          </Row>
        </Container>
    );
};

export default NoMatch;