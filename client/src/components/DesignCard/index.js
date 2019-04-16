import React from "react";
console.log("hello design card");
function DesignCard(props) {
    return (
        <div className="card mb-3">
            <img src={props.img} className="card-img-top p-3" alt={props.title} />
            <div className="card-body">
                <h6 className={"card-title font-weight-bold text-truncate"}>{props.title}</h6>
                <p className="card-text text-truncate">{props.description}</p>
                    <a href="/" className="btn btn-primary">View Design</a>
            </div>
        </div>
    );
}

export default DesignCard;