import React, { Component } from "react";
import { Row, Col } from "../../../components/Grid";
import dashboardAPI from "../../../utils/dashboardAPI";
import userAPI from "../../../utils/userAPI";
import DesignCard from "../../../components/DesignCard";
import PublishModal from "../../../components/Modals/PublishModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { Link } from "react-router-dom";

class Drafts extends Component {
  state = {
    currentUser: "",
    drafts: [],
    modalShow1: false,
    modalShow2: false,
    currentId: "",
    currentTitle: "",
    currentDescription: "",
    currentDifficulty: "",
    currentCategory: ""
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
    return (
      <Link to="/create" />
    )
  };

  publishEvent = (event, id, title, description, difficulty, category) => {
    event.preventDefault();
    this.setState({
      modalShow1: true,
      currentId: id,
      currentTitle: title,
      currentDescription: description,
      currentDifficulty: difficulty,
      currentCategory: category
    });
  };

  // This function actually sends the data to the API route. 
  sendPublishData = (id, data) => {
    if (data.title === "") {
      data.title = "Untitled";
    };
    if (data.description === "") {
      data.description = "No description";
    };
    dashboardAPI
      .publishDesign(id, data)
      .then(res => {
        this.getDrafts();
      })
      .then(
        this.setState({
          modalShow1: false
        })
      )
      .catch(err => {
        console.log(err);
      });
  };

  triggerDeleteEvent = (event, id) => {
    event.preventDefault();
    this.setState(
      {
        modalShow2: true,
        currentId: id
      }
    );
  };

  deleteEvent = (event, id) => {
    event.preventDefault();
    dashboardAPI
      .deleteDesign(id)
      .then(res => this.getDrafts())
      .then(this.modalClose2())
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

  modalClose1 = () => this.setState({ modalShow1: false });

  modalClose2= () => this.setState({ modalShow2: false });

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
                  grid={design.grid}
                  description={design.description}
                  category={design.category}
                  difficulty={design.difficulty}
                  refresh={this.getDrafts}
                  delete={this.triggerDeleteEvent}
                  publish={this.publishEvent}
                  edit={this.editEvent}
                  page={"drafts"}
                />
              </div>
            );
          })
        )}
        <PublishModal
          show={this.state.modalShow1}
          onHide={this.modalClose1}
          title={this.state.currentTitle}
          description={this.state.currentDescription}
          category={this.state.currentCategory}
          difficulty={this.state.currentDifficulty}
          publish={this.sendPublishData}
          id={this.state.currentId}
        />
        <DeleteModal
          show={this.state.modalShow2}
          onHide={this.modalClose2}
          id={this.state.currentId}
          deleteDesign={this.deleteEvent}
        />
      </Row>
    );
  }
}

export default Drafts;