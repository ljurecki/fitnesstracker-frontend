import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createActivity } from '../api';

const CreateActivity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const newActivity = {
    name,
    description,
  };

  async function addActivity() {
    const result = await createActivity(token, newActivity);
    // navigate('./Activities')
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
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default CreateActivity;