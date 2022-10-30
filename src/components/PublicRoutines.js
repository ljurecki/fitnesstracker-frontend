import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Card, Button, ButtonGroup, Modal } from 'react-bootstrap';
import ViewRoutine from './ViewRoutine';
import { getRoutinesByUsername } from '../api';

const PublicRoutines = ({
  publicRoutines,
  isLoggedIn,
  user,
  deleteSelectedRoutine,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [relatedRoutines, setRelatedRoutines] = useState([]);

  const openRelatedModal = async routine => {
    setRelatedRoutines(
      await getRoutinesByUsername({ username: routine.creatorName })
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRelatedRoutines([]);
  };

  return (
    <>
      <ListGroup variant='flush'>
        {publicRoutines && publicRoutines.length ? (
          publicRoutines.map(routine => {
            const { id, creatorName, name, goal } = routine;

            return (
              <ListGroup.Item key={id} className='px-0 py-3 mx-3'>
                <Card.Title as='h2'>{name}</Card.Title>
                <Card.Text>Goal: {goal}</Card.Text>
                <Card.Text
                  className='routineCreatorLink'
                  onClick={() => openRelatedModal(routine)}>
                  Creator: {creatorName}
                </Card.Text>
                <ButtonGroup>
                  <ViewRoutine routine={routine} />
                  {isLoggedIn && creatorName === user.username && (
                    <>
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

      <Modal
        show={showModal}
        onHide={closeModal}
        id='creatorRelatedRoutinesModal'>
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center'>
            Creator's Public Routines
          </Modal.Title>
        </Modal.Header>
        {relatedRoutines && relatedRoutines.length && (
          <>
            {relatedRoutines.map(routine => {
              const { id, name, goal } = routine;
              return (
                <Modal.Body key={id}>
                  <Card.Title>Name: {name}</Card.Title>
                  <Card.Text>Goal: {goal}</Card.Text>
                </Modal.Body>
              );
            })}
          </>
        )}
      </Modal>
    </>
  );
};

export default PublicRoutines;
