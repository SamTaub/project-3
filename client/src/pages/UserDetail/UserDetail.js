import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import DesignCard from "../../components/DesignCard";
import designAPI from "../../utils/designAPI";
import userAPI from "../../utils/userAPI";
import dashboardAPI from "../../utils/dashboardAPI";
import { FavoriteButton, UnfavoriteButton } from "../../components/DashboardButtons/DashboardButtons";
import moment from "moment";

class UserDetail extends Component {
  state = {
    username: "",
    userDesigns: [],
    usersFavorites: [],
    currentUser: "",
    isFavorite: false,
    date: ""
  };

  componentDidMount() {
    this.getUsername();
    userAPI
    .checkAuthStatus()
    .then(res => {
      this.setState({ currentUser: res.data.id }, () => this.checkUserFavorites());
    })
    .catch(err => {
      console.log(err);
    });
  }

  getUsername = () => {
    userAPI.findUserWithoutPopulation(this.props.match.params.id)
      .then(res => {
        this.setState({ username: res.data.username })
      })
  }

  checkUserFavorites = () => {
    if (this.state.currentUser !== "") {
      userAPI.findUserWithoutPopulation(this.state.currentUser)
        .then(res => {
          this.setState({ usersFavorites: res.data.favorites }, () => this.getUserDesigns())
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      this.getUserDesigns();
    }
  }

  getUserDesigns = () => {
    designAPI
      .getUserDesigns(
        this.props.match.params.id
      )
      .then(res => {
        this.setState({
          userDesigns: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }  

  render() {
    return (
      <Container styles="well p-3">
        <Row>
          <Col size="12">
            <h2 className="text-center">Designs by {this.state.username}</h2>
          </Col>
        </Row>
        <Row>
          {!this.state.userDesigns.length > 0 ? (
            <Col size="12">This user has no published designs.</Col>
          ) : (
            this.state.userDesigns.map(design => {
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
                  page={"userdetail"}
                />
              </div>
              )
            })
          )}
        </Row>
      </Container>
    )
  }
};

export default UserDetail;