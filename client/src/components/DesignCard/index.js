import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonGroup } from "../Board/Board";
import {TrashButton, EditButton, PublishButton, ViewButton, UnpublishButton, FavoriteButton, UnfavoriteButton } from "../DashboardButtons/DashboardButtons";
console.log("hello design card");

class DesignCard extends Component {
    constructor(props) {
        super(props);
    }

    // deleteEvent = (event, id) => {
    //     event.preventDefault();
    //     dashboardAPI.deleteDesign(id)
    //         .then(res => {
    //             this.setState({ drafts: res.data }, () => this.props.getDrafts)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }   

    buttons = (page) => {
        switch(page) {
            case "published":
                return(
                    <ButtonGroup
                    // NOTE: Button1 will need to be changed to a link to the design detail page
                        button1={<ViewButton id={this.props.id} link={`/design/${this.props.id}`}/>}
                        button2={<UnpublishButton onClick={event => this.props.unpublish(event, this.props.id)} id={this.props.id}/>}
                        button3={<TrashButton onClick={event => this.props.delete(event, this.props.id)} id={this.props.id}/>}
                    />
                )
            case "drafts":
                return (
                  <ButtonGroup
                    button1={
                      <EditButton
                        onClick={event =>
                          this.props.edit(event, this.props.id)
                        }
                        id={this.props.id}
                      />
                    }
                    button2={
                      <PublishButton
                        onClick={event =>
                          this.props.publish(
                            event,
                            this.props.id,
                            this.props.title,
                            this.props.description,
                            this.props.difficulty,
                            this.props.category
                          )
                        }
                        id={this.props.id}
                      />
                    }
                    button3={
                      <TrashButton
                        onClick={event =>
                          this.props.delete(
                            event,
                            this.props.id
                          )
                        }
                        id={this.props.id}
                      />
                    }
                  />
                );
            case "favorites":
                return (
                    <ButtonGroup
                        button1={<ViewButton id={this.props.id} link={`/design/${this.props.id}`}/>}
                        button2={<UnfavoriteButton onClick={event => this.props.unfavorite(event, this.props.id, this.props.userId)} id={this.props.id}/>}
                        button3={<EditButton onClick={event => this.props.edit(event, this.props.id)} id={this.props.id}/>}
                    />
                )
            case "browse":
                return (
                    <ButtonGroup
                        button1={<ViewButton id={this.props.id} link={`/design/${this.props.id}`}/>}
                        // To do: Button 2 needs to be dynamically changed based on whether or not that design is already saved to the user's favorites.
                        button2={<FavoriteButton onClick={event => this.props.favorite(event, this.props.id, this.props.userId)} id={this.props.id}/>}
                        button3={<EditButton onClick={event => this.props.edit(event, this.props.id)} id={this.props.id}/>}
                    />
                )
        }
    }

    render() {
        return (
            <div className="card mb-3">
                <img src={this.props.img} className="card-img-top p-3 designPreview" alt={this.props.title} />
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