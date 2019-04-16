import React, { Component, Fragment } from "react";
import { Board, ClearButton, CurrentColor } from "../../components/Board/Board";
import { Container, Row, Col } from "../../components/Grid";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import "./style.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: "",
      mouseIsDown: false,
      squares: this.genBlankBoard(),
      history: []
    };
  }

  genBlankBoard = () =>
    Array(20)
      .fill(0)
      .map(x => Array(20).fill(""));

  handleChange = event => {
    this.setState({
      activeColor: `rgba(${event.target.getAttribute("data-value")})`
    });
  };

  addToHistory = (current, past, rowIdx, colIdx) => {
    if (this.state.history.length < 25) {
      this.setState({
        history: this.state.history.concat({ current, past, rowIdx, colIdx })
      });
    }
  };

  handleClick = (value, rowIdx, colIdx) => {
    console.log();
    let squares = [...this.state.squares]; // Create a copy of the square values.
    let square = { ...squares[rowIdx][colIdx] }; // Find our particular square.

    const past = square; // Save past and current color for adding to our history object.
    const current = this.state.activeColor;

    square = this.state.activeColor; // Set new value of square equal to active color.
    squares[rowIdx][colIdx] = square; // Set color at the copied location.
    
    this.setState(
      { squares },
      this.addToHistory(current, past, rowIdx, colIdx)
    );
  };

  onMouseEnter = (value, rowIdx, colIdx) => {
    if (this.state.mouseIsDown) {
      this.handleClick(value, rowIdx, colIdx);
    }
  };

  onMouseDown = () => {
    this.setState({
      mouseIsDown: true
    });
  };

  onMouseUp = () => {
    this.setState({
      mouseIsDown: false
    });
  };

  clearBoard = () => {
    this.setState({
      squares: this.genBlankBoard()
    });
  };

  render() {
    return (
      <Fragment>
        <Container styles="well">
          <Row styles="justify-content-left align-items-left">
            <Col size="lg-6">
              <div id="drawDiv">
                <Board
                  activeColor={this.state.activeColor}
                  squares={this.state.squares}
                  onClick={(value, rowIdx, colIdx) =>
                    this.handleClick(value, rowIdx, colIdx)
                  }
                  onMouseEnter={(value, rowIdx, colIdx) =>
                    this.onMouseEnter(value, rowIdx, colIdx)
                  }
                  onMouseDown={this.onMouseDown}
                  onMouseUp={this.onMouseUp}
                />
              </div>
            </Col>
            <Col size="lg-6">
              <div id="currentColor">
                <p>Current Color:</p>
                <CurrentColor activeColor={this.state.activeColor} />
              </div>

              <ColorPicker onChange={this.handleChange} />
              <ClearButton onClick={this.clearBoard} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Create;
