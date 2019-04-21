import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
import { Button, Collapse, Modal, Form } from "react-bootstrap";

class PublishModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: null,
      description: "",
      difficulty: "",
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
    const { id, onHide, publish, ...modalProps } = this.props;
    // console.log(this.props);
    return (
      <Modal
        {...modalProps}
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
              <Form.Control
                as="select"
                value={this.state.difficulty}
                name="difficulty"
                onChange={this.handleInputChange}
              >
                <option value="Easy">Easy</option>
                <option value="Somewhat Easy">Somewhat Easy</option>
                <option value="Normal">Normal</option>
                <option value="Kind of Hard">Kind of Hard</option>
                <option value="Hard">Hard</option>
                <option value="Very Hard">Very Hard</option>
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
            id="publish-button"
            onClick={() =>
              this.props.publish(this.props.id, {
                title: this.state.title,
                description: this.state.description,
                difficulty: this.state.difficulty
                // categories: this.state.categories
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