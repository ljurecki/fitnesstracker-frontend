import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form, Alert } from 'react-bootstrap';
import { updateRoutine } from '../api';
import { AttachActivity, RoutineActivities } from '../components';

const EditRoutine = ({ navigate, jwt, user }) => {
  const loc = useLocation();
  const { routine } = loc.state;
  const [currentRoutine, setCurrentRoutine] = useState(routine);
  const { id, name, goal, isPublic } = currentRoutine;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [newName, setNewName] = useState(name);
  const [newGoal, setNewGoal] = useState(goal);
  const [newIsPublic, setNewIsPublic] = useState(isPublic);

  const handleSubmit = async () => {
    const updatedRoutine = {
      id,
      name: newName,
      goal: newGoal,
      isPublic: newIsPublic,
    };
    const result = await updateRoutine(updatedRoutine, jwt);
    if (!result.error) {
      setSuccessMessage('Routine Updated!');
      setTimeout(() => {
        navigate('/routines');
      }, 1000);
    } else {
      console.error(result.error);
      setErrorMessage(result.error);
    }
  };

  return (
    <>
      <Card className='flex-fill mt-3 mx-5 shadow'>
        <Card.Header
          as='h3'
          className='text-center'
          style={{ backgroundColor: '#0D6EFD', color: '#fff' }}>
          Edit Routine
        </Card.Header>
        <Form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}>
          <Form.Group className='m-3'>
            <FloatingLabel label='Name'>
              <Form.Control
                id='routineName'
                placeholder='Name'
                required
                onChange={e => setNewName(e.target.value)}
                value={newName}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Goal'>
              <Form.Control
                as='textarea'
                id='routineGoal'
                placeholder='Goal'
                required
                style={{ height: '80px' }}
                onChange={e => setNewGoal(e.target.value)}
                value={newGoal}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <Form.Check
              id='routineIsPublic'
              type='checkbox'
              label='Public'
              onChange={e => {
                setNewIsPublic(e.target.checked);
              }}
              checked={newIsPublic}
            />
          </Form.Group>

          <Form.Group className='m-3 d-flex justify-content-end'>
            <AttachActivity
              routine={currentRoutine}
              jwt={jwt}
              user={user}
              setCurrentRoutine={setCurrentRoutine}
            />
            <Button variant='success' type='submit' className='mx-2'>
              Save & Exit
            </Button>
          </Form.Group>
          {errorMessage && (
            <Alert variant='danger' className='mt-3'>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert variant='success' className='mt-3'>
              {successMessage}
            </Alert>
          )}
        </Form>
      </Card>

      <RoutineActivities routine={currentRoutine} />
    </>
  );
};
export default EditRoutine;
