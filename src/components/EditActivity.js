import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateActivity } from '../api';

const EditActivity = ({jwt, user}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function editActivity() {
    const updatedActivity = {
      name,
      description,
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
      <Button variant='primary' type='submit' onClick={(event) => { event.preventDefault(); editActivity() }}>
        Submit
      </Button>
    </Form>
  );
};

export default EditActivity;