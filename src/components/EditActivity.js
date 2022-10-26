import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateActivity } from '../api';

const EditActivity = ({ jwt, user, activities }) => {
    const {activityID} = useParams();

    const [currentActivity] = activities.filter(activity => activity.id === activityID);
    const { name, description } = currentActivity;

    
    const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
    

    async function editActivity() {
        const updatedActivity = {
            jwt: jwt,
            name: newName,
            description: newDescription,
            id:activityID
        };
        const result = await updateActivity(jwt, user, updatedActivity);
        console.log(result)
    }
    console.log(editActivity)

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
                    placeholder='Enter New Name'
                    onChange={e => {
                        setNewName(e.target.value);
                    }}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>New Description</Form.Label>
                <Form.Control placeholder='Enter New Description'
                    onChange={e => {
                        setNewDescription(e.target.value);
                    }}
                />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={(event) => { event.preventDefault(); editActivity() }}>
                Update
            </Button>
        </Form>
    );
};

export default EditActivity;