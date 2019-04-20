import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import designAPI from "../../utils/designAPI";
import colorPalette from "../../utils/colorPalette"

class Detail extends Component {
    state = {
        design: {},
        beadColors: [],
        beadCounts: {}
    };

    componentDidMount() {
        this.getDesign();
    }

    countBeads = beadArray => {
        let newBeadArray = [];
        beadArray.map((row, rowIdx) => {
            row.map((value, colIdx) => {
                if (value !== "") {
                    let rgba = Array.from(
                        value.match(/([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)/)
                    );
                    newBeadArray.push(colorPalette[rgba[0]]);
                }
            })
        })
        let beadCounts = {};

        newBeadArray.map((color) => {
            beadCounts[color] = beadCounts[color] ? beadCounts[color] + 1 : 1;
        })
        
        this.setState({ beadCounts }, () => this.setState({ beadColors: Object.keys( beadCounts )}));
    };

    getDesign = () => {
        designAPI.getDesign(this.props.match.params.id)
            .then(res => this.setState({ design: res.data }, () => this.countBeads(this.state.design.grid)))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                <Row>
                    <div className="col-5 text-center">
                        <img src={this.state.design.canvasImage} alt={this.state.design.title} style={{ imageRendering: "pixelated", height: "200px", width: "auto"}} className="fluid"/>
                    </div>
                    <div className="col-7 text-center">
                        <h1>{this.state.design.title}</h1>
                        <p><small className="text-muted">Difficulty: {this.state.design.difficulty}</small></p>
                        <p>{this.state.design.description}</p>
                    </div>
                </Row>
                <div className="row mt-5">
                    <Col size="12">
                        <h3>Beads Needed</h3>
                    </Col>
                </div>
            </Container>
        )
    }
}

export default Detail;