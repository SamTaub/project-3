import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import DesignCard from "../../components/DesignCard";
import designAPI from "../../utils/designAPI";
import userAPI from "../../utils/userAPI";
import dashboardAPI from "../../utils/dashboardAPI";
import { FavoriteButton, UnfavoriteButton } from "../../components/DashboardButtons/DashboardButtons";

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
    console.log(`finding username for ${this.props.match.params.id}`)
    userAPI.findUser(this.props.match.params.id)
    .then(res => {
      console.log(res.data);
      this.setState({ username: res.data.username })
    })
    .catch(err => console.log(err));
  }

  checkUserFavorites = () => {
    if (this.state.currentUser) {
      userAPI.findUserWithoutPopulation(this.state.currentUser)
        .then(res => {
          console.log("user found, favorites added");
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
    console.log("getting designs for" + this.props.match.params.id);
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

  favoriteEvent = (event, userId, designId) => {
    event.preventDefault();
    if (!this.state.currentUser || this.state.currentUser === "") {
      alert("You must be logged in to add a favorite!");
    }
    else {
      dashboardAPI.addFavorite(userId, designId)
        .then(res => {
          this.checkUserFavorites();
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  unfavoriteEvent = (event, userId, designId) => {
    event.preventDefault();
    if (!this.state.currentUser || this.state.currentUser === "") {
      alert("You must be logged in to add a favorite!");
    }
    else {
      dashboardAPI.removeFavorite(userId, designId)
        .then(res => {
          this.checkUserFavorites();
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <Container styles="well p-3">
        <Row styles="p-3 justify-content-center">
          <Col size="12">
            <h1 className="text-center">Designs by {this.state.username}</h1>
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
                  currentUser={this.state.currentUser}
                  img={design.canvasImage}
                  title={design.title}
                  description={design.description}
                  favorite={this.favoriteEvent}
                  unfavorite={this.unfavoriteEvent}
                  page={"user-detail"}
                  isFavorite={this.state.usersFavorites.indexOf(design._id) > -1 ? true : false}
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