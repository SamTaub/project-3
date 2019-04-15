import React, { Component } from "react";
import { Container, Row, Col } from "../../../components/Grid";

class Favorites extends Component {
    state = {
        content: false
    };
    render() {
        return (
            <Row styles="p-3">
                {!this.state.content ? (<Col size="12">No favorites to display</Col>) : ("You have favorites!")}
            </Row>
        )
    }
}

export default Favorites;