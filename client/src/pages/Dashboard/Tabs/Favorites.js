import React, { Component } from "react";
import { Container, Row, Col } from "../../../components/Grid";
import dashboardAPI from "../../../utils/dashboardAPI";
import userAPI from "../../../utils/userAPI";
import DesignCard from "../../../components/DesignCard";

class Favorites extends Component {
    state = {
        currentUser: "",
        favorites: []
    };
    
    componentDidMount() {
        userAPI.checkAuthStatus()
            .then(res => {
                console.log(res.data.id)
                this.setState({ currentUser: res.data.id}, () => this.getFavorites())
            })
            .catch(err => {
                console.log(err);
            })
    }

    getFavorites = () => {
        console.log("getting favorites... from " + this.state.currentUser);
        dashboardAPI.getFavorites(this.state.currentUser)
            .then(res => {
                this.setState({ favorites: res.data[0].favorites })
            })
            .catch(err => {
                console.log(err);
            })
    }

    unfavoriteEvent = (event, userId, designId) => {
        event.preventDefault();
        dashboardAPI.removeFavorite(userId, designId)
            .then(res => {
                this.getFavorites()
            })
            .catch(err => {
                console.log(err);
            })
    }

    editEvent = (event, id) => {
        event.preventDefault();
        alert("Edit feature coming soon!");
    }

    render() {
        return (
            <Row styles="p-3">
                {!this.state.favorites.length > 0 
                ? (
                    <Col size="12">No favorites to display</Col>
                ) : (
                    this.state.favorites.map(design => {
                        console.log(this.state.favorites);
                        return (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12" key={design._id}>
                                <DesignCard 
                                    key={design._id}
                                    id={design._id}
                                    currentUser={this.state.currentUser}
                                    img={design.canvasImage}
                                    title={design.title}
                                    description={design.description}
                                    unfavorite={this.unfavoriteEvent}
                                    edit={this.editEvent}
                                    page={"favorites"}
                                />
                            </div>
                        );
                    })
                )}
            </Row>
        )
    }
}

export default Favorites;