import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Button, Collapse, Modal, Form } from "react-bootstrap";

class PublishModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: null,
      description: null,
      difficulty: null,
      categories: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title
    });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => console.log(this.state));
  };

  render() {
    const { open } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="publish-modal-title"
        key={this.props.id}
      >
        <Modal.Header closeButton>
          <Modal.Title id="publish-modal-title">Publish Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="design-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="design-description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
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
                    <div key={`default-${checkbox}`} className="mb-1">
                      <Form.Check
                        type="checkbox"
                        id={checkbox}
                        label={checkbox}
                        key={`checkbox-${checkbox}`}
                      />
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
          <Button
            variant="light"
            onClick={() => this.props.publish(this.props.id)}
          >
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PublishModal;