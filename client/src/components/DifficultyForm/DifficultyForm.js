import React from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./style.css";

function DifficultyForm(props){

    return (
        <Form>
            <FormGroup controlId="difficulty">
                <FormLabel>Find designs by difficulty:</FormLabel>
                <Form.Control as="select" onChange={props.onChange}>
                    <option value="All" defaultValue>All</option>
                    <option value="Easy">Easy</option>
                    <option value="Slightly Easy">Slightly Easy</option>
                    <option value="Normal">Normal</option>
                    <option value="Kind of Hard">Kind of Hard</option>
                    <option value="Hard">Hard</option>
                    <option value="Crazy Hard">Crazy Hard</option>
                </Form.Control>
            </FormGroup>
        </Form>
    );
};

export default DifficultyForm;