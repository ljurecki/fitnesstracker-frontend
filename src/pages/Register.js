import React from 'react';
import { RegisterForm } from '../components';

const Register = ({ navigate, setJwt }) => {
  return (
    <>
      <h1>Register Here</h1>
      <RegisterForm navigate={navigate} setJwt={setJwt} />
    </>
  );
};

export default Register;
