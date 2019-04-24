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
          {this.props.buttonActionFunc ? (
            <Button
              variant={this.props.buttonVariant}
              onClick={this.props.buttonActionFunc}
            >
              {this.props.buttonActionText}
            </Button>
          ) : (
            <Link
              to={{
                pathname: this.props.buttonActionLink
              }}
              className={this.props.buttonVariant}
            >
              {this.props.buttonActionText}
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SimpleModal;