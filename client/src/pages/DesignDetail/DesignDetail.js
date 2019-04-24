import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import designAPI from "../../utils/designAPI";
import userAPI from "../../utils/userAPI";
import dashboardAPI from "../../utils/dashboardAPI";
import colorPalette from "../../utils/colorPalette";
import { FavoriteButton, UnfavoriteButton } from "../../components/DashboardButtons/DashboardButtons";
import moment from "moment";

class DesignDetail extends Component {
  state = {
    design: {},
    username: "Unknown",
    beadColors: [],
    beadCounts: {},
    currentUser: "",
    isFavorite: false,
    date: ""
  };

  componentDidMount() {
    userAPI
      .checkAuthStatus()
      .then(res => {
        this.setState({ currentUser: res.data.id }, () => this.getDesign());
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkUserFavorites() {
    if (this.state.currentUser) {
      userAPI.findUserWithoutPopulation(this.state.currentUser)
        .then(res => {
          if (res.data.favorites.indexOf(this.state.design._id) > -1) {
            this.setState({ isFavorite: true });
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  getDesign = () => {
    designAPI.getDesign(this.props.match.params.id)
      .then(res => this.setState({ design: res.data }, () => this.countBeads(this.state.design.grid)))
      .catch(err => console.log(err));
  };

  countBeads = beadArray => {
    // let newBeadArray = [];
    let beadCounts = {};
    beadArray.map((row, rowIdx) => {
      row.map((value, colIdx) => {
        if (value !== "") {
          let rgba = Array.from(
            value.match(/([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)/)
          );
          let color = colorPalette[rgba[0]];
          beadCounts[color] = beadCounts[color] ? beadCounts[color] + 1 : 1;
        }
      })
    })
    console.log(beadCounts);

    this.setState({ beadCounts }, () => this.setState({ beadColors: Object.keys(beadCounts) }, () => {
      this.getUsername(this.state.design.userId);
      this.checkUserFavorites();
      this.getDate();

    }));
  };

  getDate = () => {
    let timestamp = this.state.design._id.toString().substring(0, 8)
    let date = new Date(parseInt(timestamp, 16) * 1000)
    this.setState({ date: `Created on ${moment(date).format("MMM D, YYYY H:mma")}`});
  };

  getUsername = (userId) => {
    userAPI.findUser(userId)
      .then(res => this.setState({ username: res.data.username }))
      .catch(err => console.log(err));
  };

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
          this.setState({ isFavorite: false });
          this.checkUserFavorites();
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <Container styles="well p-5">
        <Row>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center">
            <img src={this.state.design.canvasImage} alt={this.state.design.title} style={{ width: "100%", height: "auto" }} className="fluid designPreview" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center">
            <h1 className="mt-3">{this.state.design.title}</h1>
            <h4>Design by <strong>{this.state.username}</strong></h4>
            <h6>{this.state.date}</h6>
            <p><small className="text-muted">Difficulty: {this.state.design.difficulty}</small>
            <br/>
            <small className="text-muted mt-0">Category: {this.state.design.category}</small></p>
            <p>{this.state.design.description}</p>
            {/* Dynamically render favorite/unfavorite button */}
            {this.state.isFavorite ? (
              <UnfavoriteButton
                onClick={event =>
                  this.unfavoriteEvent(
                    event,
                    this.state.currentUser,
                    this.state.design._id
                  )
                }
                id={this.state.design._id}
              />
            ) : (
                <FavoriteButton
                  onClick={event =>
                    this.favoriteEvent(
                      event,
                      this.state.currentUser,
                      this.state.design._id
                    )
                  }
                  id={this.state._id}
                />
              )}
          </div>
        </Row>
        <Row styles="mt-3">
          <Col size="12">
            <h3>Beads Needed</h3>
            <ul className="list-unstyled">
              <Row>
                {this.state.beadColors.map((beadColor) => {
                  return (
                    <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12" key={beadColor}>
                      <li key={beadColor}>
                        {beadColor}: {this.state.beadCounts[beadColor]}
                      </li>
                    </div>
                  )
                })}
              </Row>
            </ul>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default DesignDetail;

// style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}

// style={{width: "calc(100% / 3)"}}