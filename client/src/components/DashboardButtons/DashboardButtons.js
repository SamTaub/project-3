import React from "react";

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
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="View Detail Page" onClick={props.onClick} id={props.id}>
            <i className="fas fa-eye" />
        </button>
    )
}

export function UnpublishButton(props) {
    return (
        <button type="button" className="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Move to drafts" onClick={props.onClick} id={props.id}>
            <i className="fas fa-pencil-ruler" />
        </button>
    )
}