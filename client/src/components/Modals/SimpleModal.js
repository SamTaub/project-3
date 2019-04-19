import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

class SimpleModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={this.props.onHide}>
            {this.props.buttonRemainText}
          </Button>
          <Button
            variant="light"
            // onClick={() => <Redirect to={this.props.buttonActionFunc} />}
          >
            <Link
              to={this.props.buttonActionLink}
              style={{ textDecoration: "none", color: "black" }}
            >
              {this.props.buttonActionText}
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SimpleModal;