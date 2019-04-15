import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import NavTabs from "./NavTabs";
import Published from "./Tabs/Published";
import Drafts from "./Tabs/Drafts";
import Favorites from "./Tabs/Favorites";

class Dashboard extends Component {
    state = {
        currentTab: "Published"
    };

    handleTabClick = tab => {
        this.setState({currentTab: tab });
    };

    renderDisplay = () => {
        if (this.state.currentTab === "Published") {
            return <Published />;
        } else if (this.state.currentTab === "Drafts") {
            return <Drafts />;
        } else if (this.state.currentTab === "Favorites") {
            return <Favorites />;
        } else {
            return <Published />;
        }
    }

    render() {
        return (
            <Container styles="well p-3">
                <Row>
                    <Col size="12">
                        <NavTabs
                            currentTab={this.state.currentTab}
                            handleTabClick={this.handleTabClick}
                        />
                        {this.renderDisplay()}
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default Dashboard;