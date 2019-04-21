import React from "react";
import { Form, FormGroup, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import "./style.css";

function CategoryForm(props){
    

    return (
        <Form>
            <FormGroup controlId="category">
                <FormLabel>Find designs by category:</FormLabel>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Animals</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Fantasy</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Food</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Holidays</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Miscellaneous</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Nature</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>People</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Sports & Recreation</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Technology</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Transportation</Form.Check.Label>
                </Form.Check>
                <Form.Check>
                    <Form.Check.Input />
                    <Form.Check.Label>Video Games</Form.Check.Label>
                </Form.Check>
            </FormGroup>
        </Form>
    );
};

export default CategoryForm;