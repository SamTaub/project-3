import React, { Component } from "react";
import "./style.css";

export function Square(props) {
  return (
    <button
      className="square"
      style={{ background: props.value }}
      onClick={props.onClick}
    />
  );
}

export function ColorPicker(props) {
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

export function ClearButton(props) {
  return <button onClick={props.onClick}>Clear Board</button>;
}

export class Board extends Component {
  renderSquare(value, rowIdx, colIdx) {
    // console.log(this.props.squares[rowIdx][colIdx]);
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
