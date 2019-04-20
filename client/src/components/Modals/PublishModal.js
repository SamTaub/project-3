import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

class PublishModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Publish Design
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={12} md={12}>
                <code>TITLE</code>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={12} md={12}>
                <code>DESCRIPTION</code>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={6}>
                <code>CATEGORIES</code>
              </Col>
              <Col xs={6} md={6}>
                <code>DIFFICULTY</code>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PublishModal;