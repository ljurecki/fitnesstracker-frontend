import React, { useState, useEffect } from 'react';
import { getAllActivities } from '../api';
import { ActivityForm, EditActivity } from '../components';
import { Modal, Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Activities = ({ jwt, user }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);

  async function allActivities() {
    setActivitiesToDisplay(await getAllActivities());
  }

  useEffect(() => {
    allActivities();
  }, []);

  return (
    <>
      <div className='pageHeader'>
        <p className='pageHeading'>
          Activities
        </p>
      </div>
      <ListGroup variant='flush'>
        {jwt ? (
          <Button variant='success'
            className='position-fixed sticky-bottom rounded-pill shadow'
            size='lg'
            style={{ bottom: '25px', right: '25px' }}
            onClick={() => {
              handleShow();
            }}>
            Create Activity
          </Button>
        ) : null}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ fontSize: '20px' }} closeButton>
            <Modal.Title className='w-100 text-center'>Create Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ActivityForm user={user} jwt={jwt} />
            {' '}
          </Modal.Body>
        </Modal>

        {activitiesToDisplay ? (
          activitiesToDisplay.map(activity => {
            const { id, name, description } = activity;
            return (
              <ListGroup.Item key={id} className='px-0 py-3 mx-3'>
                <Card.Title as='h2'>{name}</Card.Title>
                <Card.Text>Description: {description}</Card.Text>
                {jwt ? (
                  <Link to={`/activities/${id}`} state={{ activity: activity }}>
                    <Button variant='info'>
                      Edit
                    </Button>
                  </Link>
                ) : null}
              </ListGroup.Item>
            );
          })
        ) : (
          <h1>No Activities Found!</h1>
        )}
      </ListGroup>
    </>
  );
};

export default Activities;


{/* <div key={id}>
  <h1>{name}</h1>
  <h3>Description:</h3> <p>{description}</p>
  {jwt ? (
    <Link to={`/activities/${id}`} state={{ activity: activity }}>
      <Button variant='info'>
        Edit
      </Button>
    </Link>

  ) : null}
</div> */}