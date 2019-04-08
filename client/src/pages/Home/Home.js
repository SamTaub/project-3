import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import "./style.css";

function Home() {
  return (
    <Container className="bg-transparent">
      <Row styles="justify-content-center align-items-center text-center text-white">
        <Col size="lg-8">
          <h1 className="mt-5" id="mast">Beadli</h1>
            <p id="subtitle">Make interesting designs with beads.</p>
            <Link className="btn btn-outline-light btn-lg" to="/login" role="button">Get Started</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
