import React, { Component } from "react";
import { Container, Row, Col } from "../../../components/Grid";
import dashboardAPI from "../../../utils/dashboardAPI";
import userAPI from "../../../utils/userAPI";

class Published extends Component {
    state = {
        currentUser: "",
        publishedDesigns: [],
        content: false
    };
    
    componentDidMount() {
        userAPI.checkAuthStatus()
            .then(res => {
                console.log(res.data.id)
                this.setState({ currentUser: res.data.id}, this.getPublishedDesigns())
            })
            .catch(err => {
                console.log(err);
            })
    }

    getPublishedDesigns = () => {
        console.log("getting published designs...")
        dashboardAPI.getPublishedDesigns()
            .then(res => {
                this.setState({ publishedDesigns: res, content: true })
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderPublishedDesigns = () => {
        console.log("rendering published designs...");
        console.log(this.state.publishedDesigns);
    }

    render() {
        return (
            <Row styles="p-3">
                {!this.state.content ? (<Col size="12">No published designs to display</Col>) : (<div>{this.renderPublishedDesigns()}</div>)}
            </Row>
        )
    }
}

export default Published;