import React, { Component } from "react";

class Favorites extends Component {
    state = {
        content: false
    };
    render() {
        return (
            <div>
                {!this.state.content ? "No favorites to display" : "You have favorites!"}
            </div>
        )
    }
}

export default Favorites;