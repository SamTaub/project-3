import React, { Component, Fragment } from "react";
import {
  Board,
  ButtonGroup,
  ClearButton,
  UndoButton,
  SaveButton,
  CurrentColor,
  Title
} from "../../components/Board/Board";
import { Container, Row, Col } from "../../components/Grid";
import SimpleModal from "../../components/Modals/SimpleModal";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import designAPI from "../../utils/designAPI";
import { Bitmap } from "../../utils/bitmap";
import "./style.css";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: "",
      mouseIsDown: false,
      squares: this.genBlankBoard(),
      history: [],
      saved: false,
      designId: null,
      title: "",
      colorName: "",
      modalShow: false
    };
  }

  genBlankBoard = () =>
    Array(20)
      .fill(0)
      .map(x => Array(20).fill(""));

  handleColorChange = event => {
    this.setState({
      activeColor: `rgba(${event.target.getAttribute("data-value")})`,
      colorName: `${event.target.getAttribute("title")}`
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

  save = () => {
    // Use Bitmap utility to generate a 2D array of RGBA values
    let bmp = new Bitmap(20, 20);
    this.state.squares.map((row, rowIdx) => {
      row.map((value, colIdx) => {
        if (value === "") {
          bmp.pixel[colIdx][rowIdx] = [0, 0, 0, 0];
        } else {
          let rgba = Array.from(
            value.match(/([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)/)
          );
          let r = parseInt(rgba[1], 10) / 255;
          let g = parseInt(rgba[2], 10) / 255;
          let b = parseInt(rgba[3], 10) / 255;
          let a = parseInt(rgba[4], 10) / 255;
          bmp.pixel[colIdx][rowIdx] = [r, g, b, a];
        }
      });
    });
    // console.log(bmp);
    let img = bmp.dataURL();
    // console.log(img);
    // Save image URI to a variable

    if (!this.state.saved) {
      // console.log(this.props.id);
      designAPI
        .createDesign({
          grid: this.state.squares,
          title: this.state.title,
          published: false,
          canvasImage: img,
          userId: this.props.id
        })
        .then(res => {
          // console.log(res);
          this.setState(
            {
              saved: true,
              designId: res.data._id
            },
            // () => alert(`Design saved!`)
            () => this.setState({ modalShow: true })
          );
        })
        .catch(err => alert(`Hmm something went wrong (${err}). Try again!`));
    } else {
      designAPI
        .updateDesign(this.state.designId, {
          grid: this.state.squares,
          title: this.state.title,
          canvasImage: img,
          userId: this.props.id
        })
        .then(res => {
          // console.log(res);
          // alert(`Design saved!`);
          this.setState({ modalShow: true });
        })
        .catch(err => alert(`Hmm something went wrong (${err}). Try again!`));
    }
  };

  handleClick = (value, rowIdx, colIdx) => {
    let squares = [...this.state.squares]; // Create a copy of the square values.
    let square = { ...squares[rowIdx][colIdx] }; // Find our particular square.

    const past = squares[rowIdx][colIdx]; // Save past and current color for our history object.
    const current = this.state.activeColor;

    square = this.state.activeColor; // Set new value of square equal to active color.
    squares[rowIdx][colIdx] = square; // Set color at the copied location.

    this.setState(
      { squares },
      this.addToHistory(current, past, rowIdx, colIdx)
    );
    // console.log(this.state.squares);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
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

  modalClose = () => this.setState({ modalShow: false });

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
              <Title
                onChange={this.handleInputChange}
                value={this.state.title}
              />
              <div id="currentColor">
                <p>{this.state.colorName}</p>
                <CurrentColor activeColor={this.state.activeColor} />
              </div>

              <ColorPicker onChange={this.handleColorChange} />

              <ButtonGroup
                button1={<UndoButton onClick={this.undo} />}
                button2={<ClearButton onClick={this.clearBoard} />}
                button3={<SaveButton onClick={this.save} />}
              />
            </Col>
          </Row>
          <SimpleModal
            show={this.state.modalShow}
            onHide={this.modalClose}
            title="Design Saved"
            body="A draft of your design has been saved to your Dashboard. You can keep working on it here, or visit your Dashboard to publish or edit it later."
            buttonActionText="View Dashboard"
            buttonActionLink="/dashboard"
            buttonRemainText="Keep Working"
          />
        </Container>
      </Fragment>
    );
  }
}

export default Create;
