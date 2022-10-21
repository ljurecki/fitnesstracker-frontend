import React, { useState } from 'react';
import { RegisterForm, LoginForm } from '../components';

const Login = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <>
      <h1>Login</h1>
      {showRegistration ? <RegisterForm /> : <LoginForm />}
    </>
  );
};

export default Login;
