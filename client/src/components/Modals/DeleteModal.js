import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      designId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     designId: nextProps.id
    });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    // const { open } = this.state;
    const { id, onHide, deleteDesign, currentUser, ...modalProps  } = this.props;
    return (
      <Modal
        {...modalProps}
        aria-labelledby="delete-modal-title"
        key={id}
        id={id}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="delete-modal-title">
            Delete Design
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete this design? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={this.props.onHide}>
            Close
          </Button>
          <Button
            variant="btn btn-outline-danger"
            id="delete-button"
            onClick={event =>
              this.props.deleteDesign(
                event,
                this.state.designId
              )
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteModal;