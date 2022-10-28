import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createActivity } from '../api';

const ActivityForm = ({jwt, user}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function addActivity() {
    const newActivity = {
      name,
      description,
    };
    const result = await createActivity(jwt, user, newActivity);
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
    </Form>
  );
};

export default ActivityForm;