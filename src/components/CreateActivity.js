import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createActivity } from '../api';

const ActivityForm = ({jwt, user, navigate}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function addActivity() {
    const newActivity = {
      name,
      description,
    };
    const result = await createActivity(jwt, user, newActivity);
    if (result.error) {
      console.error(result.error);
       setErrorMessage(result.error); 
   } else {
       navigate('./activities')
   }
}

  return (
    <Form
      id='forms'
      onSubmit={event => {
        event.preventDefault();
        addActivity();
      }}>
      <Form.Group className='mb-3'>
        <Form.Label>Activity Name</Form.Label>
        <Form.Control
          placeholder='Enter Name'
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder='Enter Description'
          onChange={e => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant='primary' type='submit' onClick={(event) => { event.preventDefault(); addActivity() }}>
        Submit
      </Button>
      {
                errorMessage ? (
                    <>
                        {[
                            'danger',
                        ].map((variant) => (
                            <Alert key={variant} variant={variant}>
                                Sorry, Activity Name Already Exists!
                            </Alert>
                        ))}

                    </>

                ) : (<></>)
            }
    </Form>
  );
};

export default ActivityForm;