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
      <Form.Group className='mb-3' style={{ margin: "3% 25% 0px 25%" }}>
        <Form.Control
          placeholder='Create username'
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3' style={{ margin: "2% 25% 0px 25%" }}>
        <Form.Control
          type='password'
          placeholder='Create Password'
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group >
      <Form.Group
        style={{ margin: "2% 25% 0px 25%" }}>
        <Button
          variant='success'
          type='submit'
          className='mx-2 justify-self-end'>
          Submit
        </Button>
        <Button variant='secondary'
          className='mx-2 justify-self-end'
          onClick={() =>
            navigate('/login')}>
          Cancel
        </Button>
      </Form.Group>
      {
        errorMessage ? (
          <>
            {[
              'danger',
            ].map((variant) => (
              <Alert
                key={variant}
                variant={variant}>
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
