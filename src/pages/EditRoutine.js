import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { updateRoutine } from '../api';

const EditRoutine = ({ navigate, jwt }) => {
  const loc = useLocation();
  const { routine } = loc.state;
  const { id, name, goal, isPublic } = routine;

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
      navigate('/routines');
    } else {
      console.error(result.error);
    }
  };

  return (
    <>
      <Card className='flex-fill mt-3 mx-5 shadow'>
        <Card.Header as='h3' className='text-center'>
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
            <Button variant='success' type='submit'>
              Update Routine
            </Button>
            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => navigate('/routines')}>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default EditRoutine;
