import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Button, Collapse, Modal, Form } from "react-bootstrap";

class PublishModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="publish-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="publish-modal-title">Publish Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="design-title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="design-description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="difficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Control as="select">
                <option>Easy</option>
                <option>Somewhat Easy</option>
                <option>Normal</option>
                <option>Kind of Hard</option>
                <option>Hard</option>
                <option>Very Hard</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              {/* <Form.Label>Categories</Form.Label> */}
              <Button
                variant="light"
                onClick={() => this.setState({ open: !open })}
                aria-controls="collapse-categories"
                aria-expanded={open}
              >
                <i className="fas fa-plus" /> Add Categories
              </Button>
              <Collapse in={this.state.open}>
                <div id="collapse-categories" style={{ marginTop: "5px" }}>
                  {["checkbox"].map(type => (
                    <div key={`default-${type}`} className="mb-3">
                      {[
                        "Animals",
                        "Fantasy",
                        "Food",
                        "Holidays",
                        "Miscellaneous",
                        "Nature",
                        "People",
                        "Sports & Recreation",
                        "Technology",
                        "Transportation",
                        "Video Games"
                      ].map(checkbox => (
                        <Form.Check
                          type={type}
                          id={checkbox}
                          label={checkbox}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </Collapse>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="light" onClick={this.props.publish}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PublishModal;