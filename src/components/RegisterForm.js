import React, { useState } from 'react';
import { register } from '../api';
import { Form, Button } from 'react-bootstrap';

const RegisterForm = ({ navigate, setJwt }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    const results = await register(username, password);
    if (results.token) {
      console.log('Success');
      setJwt(results.token);
      window.localStorage.setItem('jwt', results.token);
      navigate('/');
    }
  };

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
    </Form>
  );
};

export default RegisterForm;
