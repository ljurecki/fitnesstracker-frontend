import React, { useState } from 'react';
import { Form, Button, Alert, FloatingLabel } from 'react-bootstrap';
import { createActivity } from '../api';

const ActivityForm = ({ jwt, user, navigate }) => {
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
        <FloatingLabel label='Name'>
          <Form.Control
            placeholder=''
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className='mb-3'>
        <FloatingLabel label='Description'>
          <Form.Control
            placeholder=''
            as='textarea'
            style={{ height: '80px' }}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className='m-3 d-flex justify-content-end'>
        <Button variant='success'
          type='submit'
          onClick={(event) => {
            event.preventDefault();
            addActivity()
          }}>
          Create Activity
        </Button>
      </Form.Group>
      {
        errorMessage ? (
          <>
            {[
              'danger',
            ].map((variant) => (
              <Alert key={variant} variant={variant}>
                Sorry, Activity Name Already Exists or is Not Valid!
              </Alert>
            ))}

          </>

        ) : (<></>)
      }
    </Form>
  );
};

export default ActivityForm;