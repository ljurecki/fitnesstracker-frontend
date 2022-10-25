import React from 'react';
import { RegisterForm } from '../components';
import { Container } from 'react-bootstrap';

const Register = ({ navigate, setJwt }) => {
  
  return (
    <>
    <Container>
      <h1>Register Here</h1>
      <RegisterForm navigate={navigate} setJwt={setJwt} />
      
      </Container>
    </>
  );
};

export default Register;
