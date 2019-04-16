import React, { Component, Fragment } from "react";
import {
  Board,
  ClearButton,
  UndoButton,
  SaveButton,
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

      let squares = [...this.state.squares]; // Create a copy of the square values.
      let square = squares[rowIdx][colIdx]; // Find the value of our particular square.

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

  clearBoard = () => {
    this.setState({
      squares: this.genBlankBoard(),
      history: []
    });
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

              <div
                className="btn-toolbar special"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group mt-2 mr-2 mb-2"
                  role="group"
                  aria-label="First group"
                >
                  <UndoButton onClick={this.undo} />
                </div>
                <div
                  className="btn-group mt-2 mr-2 mb-2"
                  role="group"
                  aria-label="Second group"
                >
                  <ClearButton onClick={this.clearBoard} />
                </div>
                <div
                  className="btn-group mt-2 mr-2 mb-2 w50"
                  role="group"
                  aria-label="Third group"
                >
                  <SaveButton />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Create;
