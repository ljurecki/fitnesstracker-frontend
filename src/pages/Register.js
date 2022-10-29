import React from 'react';
import { Container } from 'react-bootstrap';
import { RegisterForm } from '../components';

const Register = ({ navigate }) => {
  return (
    <>
      <div className='pageHeader'>
        <p className='pageHeading'>
          Register!
        </p>
      </div>
    <Container>
      <RegisterForm navigate={navigate} />
    </Container>
    </>
  );
};

export default Register;
