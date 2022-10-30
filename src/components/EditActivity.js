import React, { useState } from 'react';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { updateActivity } from '../api';

const EditActivity = ({ jwt, navigate }) => {
  const loc = useLocation();
  const { activity } = loc.state;
  const { id, name, description } = activity;

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);

  async function editActivity() {
    const updatedActivity = {
      id,
      name: newName,
      description: newDescription,
    };
    const result = await updateActivity(jwt, updatedActivity);
    console.log(result);
    if (result.error) {
      console.error(result.error);
      setErrorMessage(result.error);
    } else {
      setSuccessMessage('Activity Updated!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('./activities');
      }, 1000);
    }
  }

  return (
    <>
      <Card className='flex-fill mt-3 mx-5 shadow'>
        <Card.Header
          as='h3'
          className='text-center'
          style={{ backgroundColor: '#0D6EFD', color: '#fff' }}>
          Update Activity
        </Card.Header>
        <Form
          id='forms'
          onSubmit={event => {
            event.preventDefault();
            editActivity();
          }}>
          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Activity Name'>
              <Form.Control
                placeholder={name}
                onChange={e => {
                  setNewName(e.target.value);
                }}
                value={newName}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Activity Description'>
              <Form.Control
                placeholder='Description'
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setNewDescription(e.target.value);
                }}
                value={newDescription}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className='m-3 d-flex justify-content-end'
            style={{ margin: '1% 1% 0px 1%' }}>
            <Button variant='success' type='submit'>
              Update Activity
            </Button>
            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => navigate('/activities')}>
              Cancel
            </Button>
          </Form.Group>
          {errorMessage && (
            <Alert variant='danger' className='mt-3'>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert variant='success' className='mt-3'>
              {successMessage}
            </Alert>
          )}
        </Form>
      </Card>
    </>
  );
};

export default EditActivity;
