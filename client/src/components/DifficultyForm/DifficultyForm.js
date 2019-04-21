import React from "react";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./style.css";

function DifficultyForm(props){

    return (
        <Form>
            <FormGroup controlId="difficulty">
                <FormLabel>Find designs by difficulty:</FormLabel>
                <Form.Control as="select">
                    <option>Easy</option>
                    <option>Slightly Easy</option>
                    <option>Normal</option>
                    <option>Kind of Hard</option>
                    <option>Hard</option>
                    <option>Crazy Hard</option>
                </Form.Control>
            </FormGroup>
        </Form>
    );
};

export default DifficultyForm;