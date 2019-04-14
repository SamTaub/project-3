import React, { Component, Fragment } from "react";
import { Board, ClearButton } from "../../components/Board/Board";
import { Container, Row, Col } from "../../components/Grid";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import "./style.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: "",
      squares: [
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
      ]
    };
  }

  // genBlankBoard = (numRows = 20, numCols = 20) => {
  //   let result = [];
  //   for (let i = 0; i < numRows; i++) {
  //     let row = [];
  //     for (let j; j < numCols; j++) {
  //       row.push('"');
  //     }
  //     result.push(row);
  //   }
  //   return result;
  // }

// genBoard = Array(5).fill(5).map(a=>[""]);

  handleChange = event => {
    this.setState({ activeColor: event.target.getAttribute('data-value') });
  };

  handleClick = (value, rowIdx, colIdx) => {
    let squares = [...this.state.squares]; // Create a copy of the square values.
    let square = { ...squares[rowIdx][colIdx] }; // Find our particular square.
    square = this.state.activeColor; // Set new value of square equal to active color.
    squares[rowIdx][colIdx] = square; // Set color at the copied location.
    this.setState({ squares }, 
      // () => console.log(this.state.squares)
    );
  };

  onMouseEnter = () => {
    console.log("entered");
  }

  onMouseLeave = () => {
    console.log("exited");
  }

  clearBoard = () => {
    this.setState({
      squares: [
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]

      ]
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
                    onMouseLeave={this.onMouseLeave}
                    onMouseEnter={this.onMouseEnter}
                  />
              </div>
            </Col>
            <Col size="lg-6">
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
