import React, { useState } from 'react';
import { login } from '../api';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ navigate, setJwt }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const loginUser = async () => {
    const result = await login(username, password);
    if (!result.error) {
      if (result.token) {
        setJwt(result.token);
        window.localStorage.setItem('jwt', result.token);
        navigate('/');
      } else {
        console.error('No token returned from server');
      }
    } else {
      console.error(result.error);
      // setErrorMessage(result.error)
    }
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        loginUser();
      }}>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder='Enter username'
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
      <Button variant='success' onClick={() => navigate('/register')}>
        Register
      </Button>
    </Form>

    //   errorMessage ? (
    //     <>
    //     {[
    //       'danger',
    //     ].map((variant) => (
    //       <Alert key={variant} variant={variant}>
    //         This is a {variant} alert—check it out!
    //       </Alert>
    //     ))}
    //   </>

    //   ): (<></>)
  );
};

export default LoginForm;
