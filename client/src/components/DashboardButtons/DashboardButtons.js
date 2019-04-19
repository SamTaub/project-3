import React from "react";

export function TrashButton(props) {
    return (
        <button type="button" class="btn btn-light">
            <i className="fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title="Trash" onClick={props.onClick} id={props.id}/>
        </button>
    )
}

export function EditButton(props) {
    return (
        <button type="button" class="btn btn-light">
            <i className="fas fa-edit" data-toggle="tooltip" data-placement="bottom" title="Edit" onClick={props.onClick} id={props.id}/>
        </button>
    )
}

export function PublishButton(props) {
    return (
        <button type="button" class="btn btn-light">
            <i className="fas fa-upload" data-toggle="tooltip" data-placement="bottom" title="Publish" onClick={props.onClick} id={props.id}/>
        </button>
    )
}

export function ViewButton(props) {
    return (
        <button type="button" class="btn btn-light">
            <i className="fas fa-eye" data-toggle="tooltip" data-placement="bottom" title="View Detail Page" onClick={props.onClick} id={props.id}/>
        </button>
    )
}

export function UnpublishButton(props) {
    return (
        <button type="button" class="btn btn-light">
            <i className="fas fa-pencil-ruler" data-toggle="tooltip" data-placement="bottom" title="Move to drafts" onClick={props.onClick} id={props.id}/>
        </button>
    )
}