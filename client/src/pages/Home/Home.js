import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Container, Row, Col } from "../../components/Grid";

function Home() {
  return (
    <Container className="bg-transparent">
      <div className="row justify-content-center align-items-center text-center text-white">
        <div className="col-lg-8">
          <h1 className="mt-5" id="mast">Beadli</h1>
            <p id="subtitle">Make interesting designs with beads.</p>
            <Link className="btn btn-outline-light btn-lg" to="/login" role="button">Get Started</Link>
        </div>
      </div>
    </Container>
  );
}

export default Home;
