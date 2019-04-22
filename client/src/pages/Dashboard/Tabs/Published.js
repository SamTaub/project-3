import React, { Component } from "react";
import { Container, Row, Col } from "../../../components/Grid";
import dashboardAPI from "../../../utils/dashboardAPI";
import userAPI from "../../../utils/userAPI";
import DesignCard from "../../../components/DesignCard";

class Published extends Component {
    state = {
        currentUser: "",
        publishedDesigns: []
    };
    
    componentDidMount() {
        userAPI.checkAuthStatus()
            .then(res => {
                console.log(res.data.id)
                this.setState({ currentUser: res.data.id}, () => this.getPublishedDesigns())
            })
            .catch(err => {
                console.log(err);
            })
    }

    unpublishEvent = (event, id) => {
        event.preventDefault();
        // Insert a modal here that asks the user if they're absolutely sure they want to publish this design
        dashboardAPI.unpublishDesign(id)
            .then(res => this.getPublishedDesigns())
            .catch(err => {
                console.log(err);
            })
    }   

    deleteEvent = (event, id) => {
        event.preventDefault();
        // Insert a modal here that asks the user if they're absolutely sure they want to delete, as this can't be undone
        dashboardAPI.deleteDesign(id)
            .then(res => this.getPublishedDesigns())
            .catch(err => {
                console.log(err);
            })
    }   

    getPublishedDesigns = () => {
        console.log("getting published designs... from " + this.state.currentUser);
        dashboardAPI.getPublishedDesigns(this.state.currentUser)
            .then(res => {
                this.setState({ publishedDesigns: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Row styles="p-3">
                {!this.state.publishedDesigns.length > 0 
                ? (
                    <Col size="12">No published designs to display</Col>
                ) : (
                    this.state.publishedDesigns.map(design => {
                        console.log(this.state.publishedDesigns);
                        return (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12" key={design._id}>
                                <DesignCard 
                                    key={design._id}
                                    id={design._id}
                                    img={design.canvasImage}
                                    title={design.title}
                                    description={design.description}
                                    unpublish={this.unpublishEvent}
                                    delete={this.deleteEvent}
                                    page={"published"}
                                />
                            </div>
                        );
                    })
                )}
            </Row>
        )
    }
}

export default Published;