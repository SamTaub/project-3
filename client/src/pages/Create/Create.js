import React, { Component } from "react";
import "./style.css";

function Square(props) {
  return (
    <button
      className="square"
      style={{ background: props.value }}
      onClick={props.onClick}
    />
  );
}

function ColorPicker(props) {
  return (
    <div onChange={props.onChange}>
      <select>
        <option>Select a Color</option>
        <option value="#FFF">White</option>
        <option value="#00FF00">Green</option>
        <option value="#0000FF">Blue</option>
        <option value="#FFFF00">Yellow</option>
        <option value="#00FFFF">Cyan</option>
      </select>
    </div>
  );
}

function ClearButton(props) {
  return <button onClick={props.onClick}>Clear Board</button>;
}

class Board extends Component {
  renderSquare(value, rowIdx, colIdx) {
    // console.log(this.state.squares[rowIdx][colIdx]);
    return (
      <Square
        key={colIdx}
        value={value}
        onClick={() => this.props.onClick(value, rowIdx, colIdx)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.squares.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="board-row" datarow={rowIdx}>
              {row.map((value, colIdx) =>
                this.renderSquare(value, rowIdx, colIdx)
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

class Create extends React.Component {
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
    let squares = [...this.state.squares];
    let square = { ...squares[rowIdx][colIdx] };
    square = this.state.activeColor;
    squares[rowIdx][colIdx] = square;
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
