import React, { Component, Fragment } from "react";
import {
  Board,
  ButtonGroup,
  ClearButton,
  UndoButton,
  SaveButton,
  ThreeDimensions,
  DimensionButton,
  EraserButton,
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
      modalShow: false,
      modalType: "",
      dimension: 2
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        saved: true,
        squares: this.props.location.state.squares,
        designId: this.props.location.state.designId,
        title: this.props.location.state.title
      });
    }
  }

  genBlankBoard = () => {
    return Array(20)
      .fill(0)
      .map(x => Array(20).fill(""));
  };

  handleColorChange = event => {
    if (event.target.getAttribute("data-value")) {
      this.setState({
        activeColor: `rgba(${event.target.getAttribute("data-value")})`,
        colorName: `${event.target.getAttribute("title")}`
      });
    }
  };

  getRGBTotal = rgb => {
    let total = 0;
    rgb = rgb.split(",");
    for (let i = 0; i < rgb.length; i++) {
      total += parseInt(rgb[i].replace(/[^\d]/g, ""));
    }
    return total - 255;
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

  toggle = () => {
    if (this.state.dimension === 3) {
      this.setState({
        dimension: 2
      });
    } else {
      this.setState({
        dimension: 3
      });
    }
    console.log("Dimensions: " + this.state.dimension);
  };

  erase = () => {
    this.setState({
      activeColor: "",
      colorName: "Eraser"
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
      history: [],
      modalShow: false
    });
  };

  triggerClearBoard = () => {
    this.setState({
      modalShow: true,
      modalType: "clear"
    });
  };

  save = () => {
    // Use Bitmap utility to generate a 2D array of RGBA values
    let bmp = new Bitmap(20, 20);
    this.state.squares.map((row, rowIdx) => {
      row.map((value, colIdx) => {
        if (value === "") {
          return bmp.pixel[colIdx][rowIdx] = [0, 0, 0, 0];
        } else {
          let rgba = Array.from(
            value.match(/([0-9]+), ([0-9]+), ([0-9]+), ([0-9]+)/)
          );
          let r = parseInt(rgba[1], 10) / 255;
          let g = parseInt(rgba[2], 10) / 255;
          let b = parseInt(rgba[3], 10) / 255;
          let a = parseInt(rgba[4], 10) / 255;
          return bmp.pixel[colIdx][rowIdx] = [r, g, b, a];
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
          title: this.state.title !== "" ? this.state.title : "Untitled",
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
            () => this.setState({ modalShow: true, modalType: "save" })
          );
        })
        .catch(err => alert(`Hmm something went wrong (${err}). Try again!`));
    } else {
      designAPI
        .updateDesign(this.state.designId, {
          grid: this.state.squares,
          title: this.state.title !== "" ? this.state.title : "Untitled",
          canvasImage: img,
          userId: this.props.id
        })
        .then(res => {
          // console.log(res);
          // alert(`Design saved!`);
          this.setState({ modalShow: true, modalType: "save" });
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

  onPointerEnter = (value, rowIdx, colIdx) => {
    if (this.state.mouseIsDown) {
      this.handleClick(value, rowIdx, colIdx);
    }
  };

  onPointerDown = () => {
    this.setState({
      mouseIsDown: true
    });
  };

  onPointerUp = () => {
    this.setState({
      mouseIsDown: false
    });
  };

  modalClose = () => this.setState({ modalShow: false });

  render() {
    // Props objects to conditionally render the SimpleModal
    const saveModal = {
      title: "Design Saved",
      body:
        "A draft of your design has been saved to your Dashboard. You can keep working on it here, or visit your Dashboard to publish or edit it later.",
      buttonVariant: "btn btn-outline-info",
      buttonActionText: "View Dashboard",
      buttonActionLink: "/dashboard",
      buttonRemainText: "Keep Working"
    };

    const clearModal = {
      title: "Clear Board",
      body:
        "Are you sure that you want to clear the board? This action cannot be undone.",
      buttonVariant: "outline-danger",
      buttonActionText: "Clear Board",
      buttonActionFunc: this.clearBoard,
      buttonRemainText: "Cancel"
    };

    return (
      <Fragment>
        <Container styles="well">
          <Row styles="justify-content-left align-items-left">
            <Col size="lg-6 leftCol">
              <div id="drawDiv">
                <Board
                  activeColor={this.state.activeColor}
                  squares={this.state.squares}
                  onClick={(value, rowIdx, colIdx) =>
                    this.handleClick(value, rowIdx, colIdx)
                  }
                  onPointerEnter={(value, rowIdx, colIdx) =>
                    this.onPointerEnter(value, rowIdx, colIdx)
                  }
                  onPointerDown={this.onPointerDown}
                  onPointerUp={this.onPointerUp}
                  dimension={this.state.dimension}
                />
              </div>
            </Col>
            <Col size="lg-6">
              <Title
                onChange={this.handleInputChange}
                value={this.state.title}
              />

              <ColorPicker onChange={this.handleColorChange} />
              <Row>
                <Col size="sm-12 dimension">
                  <DimensionButton
                    toggle={<ThreeDimensions onClick={this.toggle} />}
                    colorName={this.state.colorName}
                    background={this.state.activeColor}
                    eraser={<EraserButton onClick={this.erase} />}
                    color={
                      this.getRGBTotal(this.state.activeColor) < 300
                        ? "white"
                        : "black"
                    }
                  />
                </Col>
              </Row>

              <ButtonGroup
                button1={<UndoButton onClick={this.undo} />}
                button2={<ClearButton onClick={this.triggerClearBoard} />}
                button3={<SaveButton onClick={this.save} />}
              />
            </Col>
          </Row>
          {this.state.modalType === "save" ? (
            <SimpleModal
              show={this.state.modalShow}
              onHide={this.modalClose}
              {...saveModal}
            />
          ) : (
            <SimpleModal
              show={this.state.modalShow}
              onHide={this.modalClose}
              {...clearModal}
            />
          )}
        </Container>
      </Fragment>
    );
  }
}

export default Create;
