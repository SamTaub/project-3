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
  constructor(props) {
    super(props);
    this.state = {
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

  // componentWillMount -> check to see if there are

  handleClick = (cell, rowIdx, colIdx) => {
    let squares = [...this.state.squares];
    let square = { ...squares[rowIdx][colIdx] };
    square = this.props.activeColor;
    squares[rowIdx][colIdx] = square;
    this.setState({ squares }, () => console.log(this.state.squares));

    // VERSION THAT MODIFIES PREVIOUS STATE
    //   this.setState(prevState => ({
    //     squares: {
    //         ...prevState.squares,
    //         [prevState.squares[rowIdx][colIdx]]: newColor,
    //     },
    // }));
  };

  clearBoard = () => {
    console.log("click");
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

  renderSquare(cell, rowIdx, colIdx) {
    // console.log(this.state.squares[rowIdx][colIdx]);
    return (
      <Square
        key={colIdx}
        value={this.state.squares[rowIdx][colIdx]}
        onClick={() => this.handleClick(cell, rowIdx, colIdx)}
      />
    );
  }

  // generateBoard(squares) {
  //   let result;
  //   for (let i = 0; i < squares.length; i++) {
  //     for (let j = 0; j < squares[i].length; j++) {}
  //   }
  // }

  render() {
    return (
      <div>
        <ClearButton onClick={this.clearBoard} />
        {this.state.squares.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="board-row" datarow={rowIdx}>
              {row.map((cell, colIdx) =>
                this.renderSquare(cell, rowIdx, colIdx)
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
      activeColor: ""
    };
  }

  handleChange = event => {
    this.setState({ activeColor: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="game">
          <ColorPicker onChange={this.handleChange} />
          <div className="game-board">
            <Board activeColor={this.state.activeColor} />
          </div>
        </div>
      </div>
    );
  }
}

export default Create;