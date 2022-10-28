import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { updateActivity} from '../api';


const EditActivity = ({jwt}) => {
    const loc = useLocation();
    const { activity } = loc.state;
    const { id, name, description } = activity

    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);


    async function editActivity() {
        const updatedActivity = {
            id,
            name: newName,
            description: newDescription,
        };
        const result = await updateActivity(jwt, updatedActivity);
        console.log(result)
    }

    return (
        <Form
            id='forms'
            onSubmit={event => {
                event.preventDefault();
                editActivity();
            }}>
            <Form.Group className='mb-3'>
                <Form.Label>New Activity Name</Form.Label>
                <Form.Control
                    placeholder='Name'
                    onChange={e => {
                        setNewName(e.target.value);

                    }}
                    value={newName}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>New Description</Form.Label>
                <Form.Control placeholder='Description'
                    onChange={e => {
                        setNewDescription(e.target.value);
                    }}
                    value={newDescription}
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Update
            </Button>
        </Form>
    );
};

export default EditActivity;

