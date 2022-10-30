import React, { useState, useEffect } from 'react';
import { getAllActivities, getRoutinesByActivity } from '../api';
import { ActivityForm } from '../components';
import { Button, Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Activities = ({ jwt, user }) => {
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [relatedRoutines, setRelatedRoutines] = useState([]);

  const openRelatedModal = async activity => {
    setRelatedRoutines(await getRoutinesByActivity(activity));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRelatedRoutines([]);
  };

  async function allActivities() {
    setActivitiesToDisplay(await getAllActivities());
  }

  useEffect(() => {
    allActivities();
  }, []);

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey='activities' title='Activity'></Tab>
      </Tabs>

      <ListGroup variant='flush'>
        {jwt && <ActivityForm user={user} jwt={jwt} />}

        {activitiesToDisplay ? (
          activitiesToDisplay.map(activity => {
            const { id, name, description } = activity;
            return (
              <ListGroup.Item
                key={id}
                className='px-0 py-3 mx-3 d-flex flex-column'>
                <Card.Title
                  as='h2'
                  className='activityLink'
                  onClick={() => openRelatedModal(activity)}>
                  {name}
                </Card.Title>
                <Card.Text>Description: {description}</Card.Text>
                {jwt ? (
                  <Link to={`/activities/${id}`} state={{ activity: activity }}>
                    <Button variant='info'>Edit</Button>
                  </Link>
                ) : null}
              </ListGroup.Item>
            );
          })
        ) : (
          <h1>No Activities Found!</h1>
        )}
      </ListGroup>

      <Modal show={showModal} onHide={closeModal} id='relatedRoutinesModal'>
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center'>
            Routines Featuring Activity
          </Modal.Title>
        </Modal.Header>
        {relatedRoutines && relatedRoutines.length ? (
          <>
            {relatedRoutines.map(routine => {
              const { id, name, creatorName, goal } = routine;
              return (
                <Modal.Body key={id}>
                  <ListGroup.Item>
                    <Card.Title>Name: {name}</Card.Title>
                    <Card.Text>Goal: {goal}</Card.Text>
                    <Card.Subtitle className='text-muted pb-1'>
                      Creator: {creatorName}
                    </Card.Subtitle>
                  </ListGroup.Item>
                </Modal.Body>
              );
            })}
          </>
        ) : (
          <Modal.Body className='text-center'>No Routines Found</Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default Activities;
