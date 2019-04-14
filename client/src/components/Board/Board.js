import React, { Component } from "react";
import "./style.css";

export function Square(props) {
  return (
    <button
      className="square"
      style={{ background: props.value }}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
    />
  );
}

export function ClearButton(props) {
  return (
    <button className="btn btn-light btn-block" onClick={props.onClick}>
      Clear Board
    </button>
  );
}

export class Board extends Component {
  renderSquare(value, rowIdx, colIdx) {
    // console.log(this.props.squares[rowIdx][colIdx]);
    return (
      <Square
        key={colIdx}
        value={value}
        onClick={() => this.props.onClick(value, rowIdx, colIdx)}
        onMouseEnter={() => this.props.onMouseEnter(value, rowIdx, colIdx)}
      />
    );
  }

  render() {
    return (
      <div
        onMouseDown={() => this.props.onMouseDown()}
        onMouseUp={() => this.props.onMouseUp()}
      >
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
