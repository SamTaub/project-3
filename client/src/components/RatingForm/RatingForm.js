import React from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./style.css";

function RatingForm(props){

    return (
        <Form>
            <FormGroup controlId="rating">
                <FormLabel>Find designs by rating:</FormLabel>
                <Form.Control as="select" onChange={props.onChange}>
                    <option value="5">*****</option>
                    <option value="4">****</option>
                    <option value="3">***</option>
                    <option value="2">**</option>
                    <option value="1">*</option>
                </Form.Control>
            </FormGroup>
        </Form>
    );
};

export default RatingForm;