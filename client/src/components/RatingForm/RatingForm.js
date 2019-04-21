import React from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./style.css";

function RatingForm(props){

    return (
        <Form>
            <FormGroup controlId="rating">
                <FormLabel>Find designs by rating:</FormLabel>
                <Form.Control as="select">
                    <option>*****</option>
                    <option>****</option>
                    <option>***</option>
                    <option>**</option>
                    <option>*</option>
                </Form.Control>
            </FormGroup>
        </Form>
    );
};

export default RatingForm;