import React, { Component } from "react";
import { Container, Row, Col } from "../../../components/Grid";
import dashboardAPI from "../../../utils/dashboardAPI";
import userAPI from "../../../utils/userAPI";
import DesignCard from "../../../components/DesignCard";

class Drafts extends Component {
    state = {
        currentUser: "",
        drafts: []
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

    // deleteDraftEvent = (event, id) => {
    //     event.preventDefault();
    //     dashboardAPI.deleteDesign(id)
    //         .then(res => {
    //             this.setState({ drafts: res.data })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }   

    render() {
        return (
            <Row styles="p-3">
                {!this.state.drafts.length > 0 
                ? (
                    <Col size="12">No drafts to display</Col>
                ) : (
                    this.state.drafts.map(design => {
                        console.log(this.state.drafts);
                        return (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12" key={design._id}>
                                <DesignCard 
                                    key={design._id}
                                    id={design._id}
                                    img={design.canvasImage}
                                    title={design.title}
                                    description={design.description}
                                    page={"drafts"}
                                    deleteEvent={this.deleteDraftEvent}
                                />
                            </div>
                        );
                    })
                )}
            </Row>
        )
    }
}

export default Drafts;