import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createActivity } from '../api';

const createActivity = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const newActivity = {
        name,
        description,
    }

    async function addActivity() {
        const result = await createActivity(token, newActivity);
        // navigate('./Activities')
    }

    return (
        <form id="forms" onSubmit={(event) => {
            event.preventDefault();
            addActivity();
        }}>
            <Form.Group className='mb-3'>
                <Form.Label>Activity Name</Form.Label>
                <Form.Control
                    placeholder='Enter Name'
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder='Enter Description'

                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Submit
            </Button>

        </form>

    )

};



export default RegisterForm;
