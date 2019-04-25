import React, { Component } from "react";
import { Link } from "react-router-dom";
import {CardTwoButtonGroup, CardThreeButtonGroup, TrashButton, PublishButton, ViewButton, UnpublishButton, FavoriteButton, UnfavoriteButton } from "../DashboardButtons/DashboardButtons";

class DesignCard extends Component {
  constructor(props) {
    super(props);
  }  

  buttons = (page) => {
    switch(page) {
      case "published":
        return(
          <CardThreeButtonGroup
            button1={
              <ViewButton 
                id={this.props.id} 
                link={`/design/${this.props.id}`}
              />
            }
            button2={
              <UnpublishButton 
                onClick={event => 
                  this.props.unpublish(event, this.props.id)
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
      case "drafts":
        return (
          <CardThreeButtonGroup
            button1={
              <Link 
                to={{
                  pathname: "/create", 
                  state: { 
                    squares: this.props.grid,
                    designId: this.props.id,
                    title: this.props.title
                  }
                }}
                className="btn btn-light"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Edit"
              >
                <i className="fas fa-edit" />
              </Link>
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
          <CardTwoButtonGroup
            button1={
              <ViewButton 
                id={this.props.id} 
                link={`/design/${this.props.id}`}
              />
            }
            button2={
              <UnfavoriteButton 
                onClick={event => 
                  this.props.triggerUnfavoriteEvent(
                    event,
                    this.props.id
                  )
                } 
                id={this.props.id}
              />
            }
          />
        );
      case "browse":
      case "user-detail":
        return (
          <CardTwoButtonGroup
            button1={
              <ViewButton 
                id={this.props.id} 
                link={`/design/${this.props.id}`}
                />
            }
            button2={
              this.props.isFavorite ? (
                <UnfavoriteButton 
                  onClick={event => 
                    this.props.unfavorite(
                      event, 
                      this.props.currentUser, 
                      this.props.id
                    )
                  }
                  id={this.props.id}
                />
              ) : (
                <FavoriteButton 
                  onClick={event => 
                    this.props.favorite(
                      event, 
                      this.props.currentUser, 
                      this.props.id
                    )
                  } 
                  id={this.props.id}
                />
              )
            }
          />
        );
    }
  }

  render() {
    return (
      <div className="card mb-3">
        <a href={`/design/${this.props.id}`}><img src={this.props.img} className="card-img-top p-3 designPreview" alt={this.props.title} /></a>
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