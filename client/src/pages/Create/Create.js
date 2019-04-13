import React, { Component } from "react";
import { Board, ColorPicker, ClearButton } from "../../components/Board/Board";
import "./style.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: "",
      squares: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""]
      ]
    };
  }

  handleChange = event => {
    this.setState({ activeColor: event.target.value });
  };

  handleClick = (value, rowIdx, colIdx) => {
    let squares = [...this.state.squares]; // Create a copy of the square values.
    let square = { ...squares[rowIdx][colIdx] }; // Find our particular square.
    square = this.state.activeColor; // Set new value of square equal to active color.
    squares[rowIdx][colIdx] = square; // Set color at the copied location.
    this.setState({ squares }, () => console.log(this.state.squares));
  };

  clearBoard = () => {
    this.setState({
      squares: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""]
      ]
    });
  };

  render() {
    return (
      <div>
        <ColorPicker onChange={this.handleChange} />
        <ClearButton onClick={this.clearBoard} />
        <div className="game">
          <div className="game-board">
            <Board
              activeColor={this.state.activeColor}
              squares={this.state.squares}
              onClick={(value, rowIdx, colIdx) =>
                this.handleClick(value, rowIdx, colIdx)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
