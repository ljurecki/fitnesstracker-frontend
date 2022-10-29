import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Card, ButtonGroup } from 'react-bootstrap';
import { ViewRoutine } from './';

const MyRoutines = ({ myRoutines, deleteSelectedRoutine }) => {
  return (
    <ListGroup variant='flush'>
      {myRoutines && myRoutines.length ? (
        myRoutines.map(routine => {
          const { id, creatorName, name, goal } = routine;

          return (
            <ListGroup.Item key={id} className='px-0 py-3 mx-3'>
              <Card.Title as='h2'>{name}</Card.Title>
              <Card.Text>Goal: {goal}</Card.Text>
              <Card.Text>Creator: {creatorName}</Card.Text>
              <ButtonGroup>
                <ViewRoutine routine={routine} />

                <Link to={`/routines/${id}`} state={{ routine: routine }}>
                  <Button variant='info' className='mx-2'>
                    Edit
                  </Button>
                </Link>

                <Button
                  variant='danger'
                  onClick={() => {
                    if (confirm('Are you sure you want to delete?')) {
                      deleteSelectedRoutine(routine);
                    }
                  }}>
                  Delete
                </Button>
              </ButtonGroup>
            </ListGroup.Item>
          );
        })
      ) : (
        <h3 className='text-center mt-4'>No Routines Found</h3>
      )}
    </ListGroup>
  );
};

export default MyRoutines;
