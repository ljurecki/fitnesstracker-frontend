import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { LoginForm } from '../components';

const Login = ({ navigate, setJwt }) => {
  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey="Login" title="Welcome Back, Log In!"></Tab>
      </Tabs>
      <Container>
        <LoginForm navigate={navigate} setJwt={setJwt} />
      </Container>
    </>
  );
};

export default Login;
