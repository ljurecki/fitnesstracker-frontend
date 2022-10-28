import React, { useState } from 'react';
import { register } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const registerUser = async () => {
    const results = await register(username, password);
    if (!results.error) {
      navigate('/login');
    } else {
      console.error(results.error);
      setErrorMessage(results.error)
    }
  };

  //Show success on register, then redirect after 3 seconds

  return (
    <Form
      id='forms'
      onSubmit={event => {
        event.preventDefault();
        registerUser();
      }}>
      <Form.Group className='mb-3'>
        <Form.Label>Create Username</Form.Label>
        <Form.Control
          placeholder='Enter username'
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Create Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter Password'
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
      <Button variant='secondary' onClick={() => navigate('/login')}>
        Cancel
      </Button>
      {
        errorMessage ? (
          <>
            {[
              'danger',
            ].map((variant) => (
              <Alert key={variant} variant={variant}>
               Password must be at least 8 characters long!
              </Alert>
            ))}

          </>

        ) : (<></>)
      }
    </Form>

  );
};

export default RegisterForm;
