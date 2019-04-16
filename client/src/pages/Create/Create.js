import React, { Component, Fragment } from "react";
import {
  Board,
  ClearButton,
  UndoButton,
  CurrentColor
} from "../../components/Board/Board";
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
    let history = [...this.state.history];

    if (this.state.history.length === 25) {
      history.shift();
    }

    history.push({ current, past, rowIdx, colIdx });

    this.setState({
      history
    });
  };

  undo = () => {
    if (this.state.history.length > 0) {
      const lastEvent = this.state.history[this.state.history.length - 1];
      const { rowIdx, colIdx, past } = lastEvent;
      // console.log(rowIdx, colIdx, current, past);

      let squares = [...this.state.squares]; // Create a copy of the square values.
      // console.log(squares);
      let square = squares[rowIdx][colIdx]; // Find the value of our particular square.
      // console.log(square);

      // console.log(past);

      square = past; // Set new value of square equal to the previous color state.
      squares[lastEvent.rowIdx][lastEvent.colIdx] = square; // Set color at the copied location.

      let history = [...this.state.history];
      history.pop();

      this.setState({
        squares,
        history
      });
    }
  };

  handleClick = (value, rowIdx, colIdx) => {
    let squares = [...this.state.squares]; // Create a copy of the square values.
    let square = { ...squares[rowIdx][colIdx] }; // Find our particular square.

    const past = squares[rowIdx][colIdx]; // Save past and current color for adding to our history object.
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
      squares: this.genBlankBoard(),
      history: []
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

              <UndoButton onClick={this.undo} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Create;
