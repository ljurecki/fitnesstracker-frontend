import React from 'react';
import { EditActivity } from '../components';
import { Container } from 'react-bootstrap';

const UpdateActivity = ({ navigate, jwt }) => {
  
  return (
    <Container>
      <h1>Edit Activity</h1>
      <EditActivity navigate={navigate} jwt={jwt} />
    </Container>
  );
};

export default UpdateActivity;