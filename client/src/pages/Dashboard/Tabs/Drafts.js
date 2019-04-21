import React, { Component } from "react";
import { Container, Row, Col } from "../../../components/Grid";
import dashboardAPI from "../../../utils/dashboardAPI";
import userAPI from "../../../utils/userAPI";
import DesignCard from "../../../components/DesignCard";
import PublishModal from "../../../components/Modals/PublishModal";

class Drafts extends Component {
  state = {
    currentUser: "",
    drafts: [],
    modalShow: false,
    currentId: "",
    currentTitle: ""
  };

  componentDidMount() {
    userAPI
      .checkAuthStatus()
      .then(res => {
        console.log(res.data.id);
        this.setState({ currentUser: res.data.id }, () => this.getDrafts());
      })
      .catch(err => {
        console.log(err);
      });
  }

  editEvent = (event, id) => {
    event.preventDefault();
    alert("Edit function coming soon!");
  };

  publishEvent = (event, id, title) => {
    console.log(id, title);
    event.preventDefault();
    // Insert a modal here that asks the user if they're absolutely sure they want to publish this design.
    this.setState({
      modalShow: true,
      currentId: id,
      currentTitle: title
    });
  };

  // This function actually sends the data to the API route. 
  sendPublishData = (id, data) => {
    dashboardAPI
      .publishDesign(id, data)
      .then(res => {
        this.getDrafts();
      })
      .then(
        this.setState({
          modalShow: false
        })
      )
      .catch(err => {
        console.log(err);
      });
  };

  deleteEvent = (event, id) => {
    event.preventDefault();
    // Insert a modal here that asks the user if they're absolutely sure they want to delete, as this can't be undone
    dashboardAPI
      .deleteDesign(id)
      .then(res => this.getDrafts())
      .catch(err => {
        console.log(err);
      });
  };

  getDrafts = () => {
    console.log("getting drafts... from " + this.state.currentUser);
    dashboardAPI
      .getDrafts(this.state.currentUser)
      .then(res => {
        this.setState({ drafts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalClose = () => this.setState({ modalShow: false });

  render() {
    return (
      <Row styles="p-3">
        {!this.state.drafts.length > 0 ? (
          <Col size="12">No drafts to display</Col>
        ) : (
          this.state.drafts.map(design => {
            // console.log(this.state.drafts);
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
                  refresh={this.getDrafts}
                  delete={this.deleteEvent}
                  publish={this.publishEvent}
                  edit={this.editEvent}
                  page={"drafts"}
                />
              </div>
            );
          })
        )}
        <PublishModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          title={this.state.currentTitle}
          publish={this.sendPublishData}
          id={this.state.currentId}
        />
      </Row>
    );
  }
}

export default Drafts;