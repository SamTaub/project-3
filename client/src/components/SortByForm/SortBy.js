import React from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./style.css";

function SortBy(props){

    return (
        <Form>
            <FormGroup controlId="sort">
                <FormLabel>Sort by:</FormLabel>
                <Form.Control as="select" onChange={props.onChange}>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </Form.Control>
            </FormGroup>
        </Form>
    );
};

export default SortBy;