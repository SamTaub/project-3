import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class PublishModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: null,
      description: "",
      difficulty: "",
      category: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      description: nextProps.description,
      category: nextProps.category,
      difficulty: nextProps.difficulty
    });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { id, onHide, publish, ...modalProps } = this.props;
    return (
      <Modal
        {...modalProps}
        size="lg"
        aria-labelledby="publish-modal-title"
        key={this.props.id}
        id={this.props.id}
        onHide={onHide}
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
              <Form.Control
                as="select"
                value={this.state.difficulty}
                name="difficulty"
                onChange={this.handleInputChange}
              >
                {[
                  "Easy",
                  "Slightly Easy",
                  "Normal",
                  "Kind of Hard",
                  "Hard",
                  "Crazy Hard"
                ].map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={this.state.category}
                name="category"
                onChange={this.handleInputChange}
              >
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
                ].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={this.props.onHide}>
            Close
          </Button>
          <Button
            variant="btn btn-outline-success"
            id="publish-button"
            onClick={() =>
              this.props.publish(this.props.id, {
                title: this.state.title,
                description: this.state.description,
                difficulty: this.state.difficulty,
                category: this.state.category
              })
            }
          >
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PublishModal;