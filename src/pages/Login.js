import React from 'react';
import { Container } from 'react-bootstrap';
import { LoginForm } from '../components';

const Login = ({ navigate, setJwt }) => {
  return (
    <Container>
      <h1>Login</h1>
      <LoginForm navigate={navigate} setJwt={setJwt} />
    </Container>
  );
};

export default Login;
