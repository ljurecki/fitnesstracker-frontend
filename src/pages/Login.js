import React from 'react';
import { Container } from 'react-bootstrap';
import { LoginForm } from '../components';

const Login = ({ navigate, setJwt }) => {
  return (
    <>
      <div className='pageHeader'>
        <p className='pageHeading'>
          Welcome Back, Log In!
        </p>
      </div>
      <Container>
        <LoginForm navigate={navigate} setJwt={setJwt} />
      </Container>
    </>
  );
};

export default Login;
