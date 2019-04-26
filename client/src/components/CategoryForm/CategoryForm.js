import React from "react";
import { Form, FormGroup, FormLabel } from "react-bootstrap";
import "./style.css";

function CategoryForm(props){
    

    return (
        <Form>
            <FormGroup controlId="category">
                <FormLabel>Category:</FormLabel>
                <Form.Control as="select" onChange={props.onChange}>
                    <option value="All" defaultValue>All</option>
                    <option value="Animals">Animals</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Food">Food</option>
                    <option value="Holidays">Holidays</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Nature">Nature</option>
                    <option value="People">People</option>
                    <option value="Sports & Recreation">Sports & Recreation</option>
                    <option value="Technology">Technology</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Video Games">Video Games</option>
                </Form.Control>
            </FormGroup>
        </Form>
    );
};

export default CategoryForm;