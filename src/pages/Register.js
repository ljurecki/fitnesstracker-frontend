import React from 'react';
import { Container } from 'react-bootstrap';
import { RegisterForm } from '../components';

const Register = ({ navigate }) => {
  return (
    <Container>
      <h1>Register Here</h1>
      <RegisterForm navigate={navigate} />
    </Container>
  );
};

export default Register;
