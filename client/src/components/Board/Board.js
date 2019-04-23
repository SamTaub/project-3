import React, { Component } from "react";
import "./style.css";

export function Square(props) {
  return (
    <button
      className={
        props.dimension === 2
          ? props.value !== ""
            ? "circle"
            : "square"
          : props.value !== ""
          ? "peg"
          : "square"
      }
      style={{ borderColor: props.value }}
      onClick={props.onClick}
      onPointerEnter={props.onPointerEnter}
    />
  );
}

export function Title(props) {
  return (
    <div className="input-group input-group-lg mt-2">
      <input
        type="text"
        name="title"
        value={props.value}
        onChange={props.onChange}
        placeholder="Name your beadiful creation"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
      />
    </div>
  );
}

export function DimensionButton(props) {
  return (
    <div
      className="btn-toolbar special"
      role="toolbar"
      aria-label="Toolbar with button groups"
      id="dimension-toolbar"
    >
      <div
        className="btn-group mt-2 mr-2 mb-2"
        role="group"
        aria-label="dimension-toggle"
        id="dimension-group"
      >
        {props.toggle}
      </div>
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

export function ThreeDimensions(props) {
  return (
    <button id="dimensionbutton" type="button" className="btn btn-light" onClick={props.onClick}>
      <i className="fas fa-cube" />
    </button>
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
        dimension={this.props.dimension}
        onClick={() => this.props.onClick(value, rowIdx, colIdx)}
        onPointerEnter={() => this.props.onPointerEnter(value, rowIdx, colIdx)}
      />
    );
  }

  render() {
    return (
      <div
        id="board"
        onPointerDown={() => this.props.onPointerDown()}
        onPointerUp={() => this.props.onPointerUp()}
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
