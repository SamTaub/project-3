import React, { Component } from "react";
import { Row, Col } from "../../../components/Grid";
import dashboardAPI from "../../../utils/dashboardAPI";
import userAPI from "../../../utils/userAPI";
import DesignCard from "../../../components/DesignCard";
import DeleteModal from "../../../components/Modals/DeleteModal";

class Published extends Component {
  state = {
    currentUser: "",
    publishedDesigns: [],
    modalShow: false,
    currentId: null
  };

  componentDidMount() {
    userAPI
      .checkAuthStatus()
      .then(res => {
        console.log(res.data.id);
        this.setState({ currentUser: res.data.id }, () =>
          this.getPublishedDesigns()
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  unpublishEvent = (event, id) => {
    event.preventDefault();
    // Insert a modal here that asks the user if they're absolutely sure they want to publish this design
    dashboardAPI
      .unpublishDesign(id)
      .then(res => this.getPublishedDesigns())
      .catch(err => {
        console.log(err);
      });
  };

  triggerDeleteEvent = (event, id) => {
    event.preventDefault();
    this.setState({
      modalShow: true,
      currentId: id
    });
  };

  deleteEvent = (event, id) => {
    event.preventDefault();
    // Insert a modal here that asks the user if they're absolutely sure they want to delete, as this can't be undone
    dashboardAPI
      .deleteDesign(id)
      .then(res => this.getPublishedDesigns())
      .then(this.modalClose())
      .catch(err => {
        console.log(err);
      });
  };

  getPublishedDesigns = () => {
    console.log("getting published designs... from " + this.state.currentUser);
    dashboardAPI
      .getPublishedDesigns(this.state.currentUser)
      .then(res => {
        this.setState({ publishedDesigns: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalClose = () => this.setState({ modalShow: false });

  render() {
    return (
      <Row styles="p-3">
        {!this.state.publishedDesigns.length > 0 ? (
          <Col size="12">No published designs to display</Col>
        ) : (
          this.state.publishedDesigns.map(design => {
            console.log(this.state.publishedDesigns);
            return (
              <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12"
                key={design._id}
              >
                <DesignCard
                  key={design._id}
                  id={design._id}
                  img={design.canvasImage}
                  title={design.title}
                  description={design.description}
                  unpublish={this.unpublishEvent}
                  delete={this.triggerDeleteEvent}
                  page={"published"}
                />
              </div>
            );
          })
        )}
        <DeleteModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          id={this.state.currentId}
          deleteDesign={this.deleteEvent}
        />
      </Row>
    );
  }
}

export default Published;