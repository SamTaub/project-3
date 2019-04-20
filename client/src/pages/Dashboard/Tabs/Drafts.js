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
        modalShow: false
    };
    
    componentDidMount() {
        userAPI.checkAuthStatus()
            .then(res => {
                console.log(res.data.id)
                this.setState({ currentUser: res.data.id}, () => this.getDrafts())
            })
            .catch(err => {
                console.log(err);
            })
    }

    editEvent = (event, id) => {
        event.preventDefault();
        alert("Edit function coming soon!");
    }

    publishEvent = (event, id) => {
        event.preventDefault();
        // Insert a modal here that asks the user if they're absolutely sure they want to publish this design.
        this.setState(
          { modalShow: true },
          dashboardAPI
            .publishDesign(id)
            .then(res => this.getDrafts())
            .catch(err => {
              console.log(err);
            })
        );
    }   

    deleteEvent = (event, id) => {
        event.preventDefault();
        // Insert a modal here that asks the user if they're absolutely sure they want to delete, as this can't be undone
        dashboardAPI.deleteDesign(id)
            .then(res => this.getDrafts())
            .catch(err => {
                console.log(err);
            })
    }   

    getDrafts = () => {
        console.log("getting drafts... from " + this.state.currentUser);
        dashboardAPI.getDrafts(this.state.currentUser)
            .then(res => {
                this.setState({ drafts: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    modalClose = () => this.setState({ modalShow: false });
    
    render() {
        return (
          <Row styles="p-3">
            {!this.state.drafts.length > 0 ? (
              <Col size="12">No drafts to display</Col>
            ) : (
              this.state.drafts.map(design => {
                console.log(this.state.drafts);
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
            //   title="Design Saved"
            //   body="A draft of your design has been saved to your Dashboard. You can keep working on it here, or visit your Dashboard to publish or edit it later."
            //   buttonActionText="View Dashboard"
            //   buttonActionLink="/dashboard"
            //   buttonRemainText="Keep Working"
            />
          </Row>
        );
    }
}

export default Drafts;