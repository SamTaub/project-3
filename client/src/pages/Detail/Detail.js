import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import designAPI from "../../utils/designAPI";
import userAPI from "../../utils/userAPI";
import colorPalette from "../../utils/colorPalette";

class Detail extends Component {
    state = {
        design: {},
        username: "Unknown",
        beadColors: [],
        beadCounts: {}
    };

    componentDidMount() {
        this.getDesign();
    }

    countBeads = beadArray => {
        // let newBeadArray = [];
        let beadCounts = {};
        beadArray.map((row, rowIdx) => {
            row.map((value, colIdx) => {
                if (value !== "") {
                    let rgba = Array.from(
                        value.match(/([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)/)
                    );
                    let color = colorPalette[rgba[0]];
                    beadCounts[color] = beadCounts[color] ? beadCounts[color] + 1 : 1;
                    // newBeadArray.push(colorPalette[rgba[0]]);
                }
            })
        })
        console.log(beadCounts);
        
        this.setState({ beadCounts }, () => this.setState({ beadColors: Object.keys( beadCounts )}, () => this.getUsername(this.state.design.userId)));
    };

    getDesign = () => {
        designAPI.getDesign(this.props.match.params.id)
            .then(res => this.setState({ design: res.data }, () => this.countBeads(this.state.design.grid)))
            .catch(err => console.log(err));
    };

    getUsername = (userId) => {
        userAPI.findUser(userId)
            .then(res => this.setState({username: res.data.username}))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container styles="well p-5">
                <Row>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center">
                        <img src={this.state.design.canvasImage} alt={this.state.design.title} style={{width: "100%", height: "auto"}} className="fluid designPreview"/>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center">
                        <h1 className="mt-3">{this.state.design.title}</h1>
                        <h5>Design by <strong>{this.state.username}</strong></h5>
                        <p><small className="text-muted">Difficulty: {this.state.design.difficulty}</small></p>
                        <p>{this.state.design.description}</p>
                    </div>
                </Row>
                <Row styles="mt-3">
                    <Col size="12">
                        <h3>Beads Needed</h3>
                        <ul className="list-unstyled">
                        <Row>
                                {this.state.beadColors.map((beadColor) => {
                                    return (
                                        <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12" key={beadColor}>
                                            <li key={beadColor}>
                                                {beadColor}: {this.state.beadCounts[beadColor]}
                                            </li>
                                        </div>
                                    )
                                })}
                        </Row>
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Detail;

// style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}

// style={{width: "calc(100% / 3)"}}