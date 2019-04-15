import React, { Component } from "react";
import { Container, Row, Col } from "../../../components/Grid";

class Drafts extends Component {
    state = {
        content: false
    };
    render() {
        return (
            <Row styles="p-3">
                {!this.state.content ? (<Col size="12">No drafts to display</Col>) : ("You have drafts!")}
            </Row>
        )
    }
}

export default Drafts;