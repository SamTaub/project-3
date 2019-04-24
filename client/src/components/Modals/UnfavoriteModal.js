import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class UnfavoriteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      userId: null,
      designId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     userId: nextProps.currentUser,
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
    const { id, onHide, unfavorite, currentUser, ...modalProps  } = this.props;
    return (
      <Modal
        {...modalProps}
        aria-labelledby="publish-modal-title"
        key={id}
        id={id}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="publish-modal-title">
            Unfavorite Design
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to unfavorite this design?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={this.props.onHide}>
            Close
          </Button>
          <Button
            variant="light"
            id="publish-button"
            onClick={event =>
              this.props.unfavorite(
                event,
                this.state.userId,
                this.state.designId
              )
            }
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UnfavoriteModal;