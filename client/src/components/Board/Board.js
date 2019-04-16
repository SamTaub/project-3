import React, { Component } from "react";
import "./style.css";

export function Square(props) {
  return (
    <button
      className={props.value !== "" ? "circle" : "square"}
      style={{ borderColor: props.value }}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
    />
  );
}

export function Title() {
  return (
    <div className="input-group input-group-lg">
      <input
        type="text"
        placeholder="Name your beadiful creation"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
      />
    </div>
  );
}

export function ButtonGroup(props) {
  return (
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
        {props.button1}
      </div>
      <div
        className="btn-group mt-2 mr-2 mb-2"
        role="group"
        aria-label="Second group"
      >
        {props.button2}
      </div>
      <div
        className="btn-group mt-2 mr-2 mb-2 w50"
        role="group"
        aria-label="Third group"
      >
        {props.button3}
      </div>
    </div>
  );
}

export function CurrentColor(props) {
  return (
    <svg width="45" height="30">
      <circle
        cx="15"
        cy="15"
        r="10"
        style={{
          fill: "transparent",
          fillOpacity: 1,
          stroke: props.activeColor,
          strokeWidth: "8"
        }}
      />
    </svg>
  );
}

export function ClearButton(props) {
  return (
    <button type="button" className="btn btn-light" onClick={props.onClick}>
      <i className="fas fa-trash-alt" />
    </button>
  );
}

export function UndoButton(props) {
  return (
    <button type="button" className="btn btn-light" onClick={props.onClick}>
      <i className="fas fa-undo-alt" />
    </button>
  );
}

export function SaveButton(props) {
  return (
    <button type="button" className="btn btn-light" onClick={props.onClick}>
      <i className="fas fa-save" />
    </button>
  );
}

export class Board extends Component {
  renderSquare(value, rowIdx, colIdx) {
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
