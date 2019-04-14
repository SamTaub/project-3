import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";

function Dashboard() {
    return (
        <Container styles="well p-3">
            <Row>
                <Col size="12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Published</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Drafts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Favorites</a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;