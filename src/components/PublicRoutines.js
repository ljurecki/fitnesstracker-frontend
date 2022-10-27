import React from 'react';
import { ListGroup, Card, Button, ButtonGroup } from 'react-bootstrap';
import ViewRoutine from './ViewRoutine';

const PublicRoutines = ({ publicRoutines, isLoggedIn, user }) => {
  return (
    <ListGroup variant='flush'>
      {publicRoutines && publicRoutines.length ? (
        publicRoutines.map(routine => {
          const { id, creatorName, name, goal } = routine;

          return (
            <ListGroup.Item key={id} className='px-0 py-3 mx-3'>
              <Card.Title as='h2'>{name}</Card.Title>
              <Card.Text>Goal: {goal}</Card.Text>
              <Card.Text>Creator: {creatorName}</Card.Text>
              <ButtonGroup>
                {/* <Link to={`/posts/${_id}`} state={{ post: post }}> */}
                {/* <Button variant='success'>View</Button> */}
                <ViewRoutine routine={routine} />
                {/* </Link> */}
                {isLoggedIn && creatorName === user.username && (
                  <>
                    <Button variant='info' className='mx-2'>
                      Edit
                    </Button>
                    <Button variant='danger'>Delete</Button>
                  </>
                )}
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

export default PublicRoutines;
