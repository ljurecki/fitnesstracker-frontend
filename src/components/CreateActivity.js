import React, { useState } from 'react';
import { Form, Button, Alert, FormGroup } from 'react-bootstrap';
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
        <Form.Label>Activity Name</Form.Label>
        <Form.Control
          placeholder=''
          onChange={e => {
            setName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>
          Description
        </Form.Label>
        <Form.Control
          placeholder=''
          as='textarea'
          style={{ height: '80px' }}
          onChange={e => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>
      <FormGroup className='m-3 d-flex justify-content-end'>
        <Button variant='success'
          type='submit'
          onClick={(event) => {
            event.preventDefault();
            addActivity()
          }}>
          Create Activity
        </Button>
      </FormGroup>
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