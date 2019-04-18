import React, { Component } from "react";
import { ButtonGroup } from "../Board/Board";
console.log("hello design card");

class DesignCard extends Component {
    constructor(props) {
        super(props);
    }

    trashButton = () => {
        return (
            <button type="button" class="btn btn-light">
                <i className="fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title="Trash" />
            </button>
        )
    }

    buttons = (page) => {
        switch(page) {
            case "published":
                break;
            case "drafts":
                    return (
                        <ButtonGroup
                            button1={<div className="btn-group mr-2" role="group" aria-label="First group">
                                <button type="button" class="btn btn-light"><i class="fas fa-upload" data-toggle="tooltip" data-placement="bottom" title="Publish"/></button>
                            </div>}
                            button2={<div className="btn-group mr-2" role="group" aria-label="Second group">
                                <button type="button" class="btn btn-light"><i class="fas fa-edit" data-toggle="tooltip" data-placement="bottom" title="Edit" /></button>
                            </div>}
                            button3={this.trashButton}
                        />
                    )
            case "favorites":
                break;
            case "browse":
                break;
        }
    }
    render() {
        return (
            <div className="card mb-3">
                <img src={this.props.img} style={{ imageRendering: "pixelated" }} className="card-img-top p-3" alt={this.props.title} />
                <div className="card-body">
                    <h6 className={"card-title font-weight-bold text-truncate"}>{this.props.title}</h6>
                    <p className="card-text text-truncate">{this.props.description}</p>
                    {/* Buttons */}
                    {this.buttons(this.props.page)}
                </div>
            </div>
        );
    }
}

export default DesignCard;