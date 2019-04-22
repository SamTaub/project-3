import React from "react";

export function CardButtonGroup(props) {
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

export function TrashButton(props) {
    return (
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Trash" onClick={props.onClick} id={props.id}>
            <i className="fas fa-trash-alt" />
        </button>
    )
}

export function EditButton(props) {
    return (
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Edit" onClick={props.onClick} id={props.id}>
            <i className="fas fa-edit" />
        </button>
    )
}

export function PublishButton(props) {
    return (
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Publish" onClick={props.onClick} id={props.id}>
            <i className="fas fa-upload" />
        </button>
    )
}

export function ViewButton(props) {
    return (
        <a role="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="View Detail Page" id={props.id} href={props.link}>
            <i className="fas fa-eye" />
        </a>
    )
}

export function UnpublishButton(props) {
    return (
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Move to drafts" onClick={props.onClick} id={props.id}>
            <i className="fas fa-pencil-ruler" />
        </button>
    )
}

export function FavoriteButton(props) {
    return (
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Favorite" onClick={props.onClick} id={props.id}>
            <i className="far fa-heart" />
        </button>
    )
}

export function UnfavoriteButton(props) {
    return (
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Remove favorite" onClick={props.onClick} id={props.id}>
            <i className="fas fa-heart" />
        </button>
    )
}