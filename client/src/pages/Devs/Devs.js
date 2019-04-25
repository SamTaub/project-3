import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import "./style.css";

class Devs extends Component {

    render() {
        return (

            <Container styles="well p-3">
                <Row>
                    <h1>Beadli Dev Team</h1>
                </Row>
                <Row>
                    <div className="justify-content-center p-3">
                        <Link to="//chrisluber.com" className="card-text text-center" target="_blank"><h2 className="text-center">Chris</h2></Link>
                        <div className="m-3">
                            <img src={require("../../assets/images/chris.jpeg")} className="card-img-top rounded-circle" alt="Chris" />
                        </div>
                    </div>
                    <div className="justify-content-center p-3">
                        <Link to="//shelbyreyes.net" className="card-text text-center" target="_blank"><h2 className="text-center">Shelby Reyes</h2></Link>
                        <div className="m-3">
                            <img src={require("../../assets/images/shelby.jpeg")} className="card-img-top rounded-circle" alt="Shelby" />
                        </div>
                    </div>
                    <div className="justify-content-center p-3">
                        <Link to="//samtaubweb.dev" className="card-text text-center" target="_blank"><h2 className="text-center">Sam Taub</h2></Link>
                        <div className="m-3">
                            <img src={require("../../assets/images/sam.png")} className="card-img-top rounded-circle" alt="Sam" />
                        </div>
                    </div>
                    <div className="justify-content-center p-3">
                        <Link to="//kennywhitebloom.net" className="card-text text-center" target="_blank"><h2 className="text-center">Kenny</h2></Link>
                        <div className="m-3">
                            <img src={require("../../assets/images/kenny.png")} className="card-img-top rounded-circle" alt="Kenny" />
                        </div>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Devs;
