import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  FloatingLabel,
  ListGroup,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import RoutineActivities from './RoutineActivities';

const ViewRoutine = ({ routine }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant='success'
        onClick={() => {
          openModal();
        }}>
        View
      </Button>

      <Modal show={showModal} onHide={closeModal} size='lg'>
        <Modal.Header style={{ fontSize: '20px' }} closeButton>
          <Modal.Title className='w-100 text-center'>
            {routine.name}
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className='m-3'>
            <FloatingLabel label='Goal'>
              <Form.Control
                as='textarea'
                id='routineGoal'
                plaintext
                readOnly
                style={{ height: '80px' }}
                defaultValue={routine.goal}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Row} className='m-3'>
            <Col className='p-0'>
              <FloatingLabel label='Creator'>
                <Form.Control
                  id='creatorName'
                  plaintext
                  readOnly
                  defaultValue={routine.creatorName}
                />
              </FloatingLabel>
            </Col>
            <Col className='p-0 d-flex justify-content-center align-items-center'>
              <Form.Check
                id='routineIsPublic'
                type='checkbox'
                label='Public'
                readOnly
                checked={routine.isPublic}
              />
            </Col>
          </Form.Group>

          <RoutineActivities
            // className='border-top border-bottom border-dark'
            routine={routine}
          />
          {/* <Card
            id='attachedActivities'
            variant='flush'
            className='border-top border-bottom border-dark'>
            <ListGroup.Item className='text-center fs-3 mb-1 bg-light'>
              Attached Activities
            </ListGroup.Item>
            {routine.activities && routine.activities.length ? (
              <ListGroup id='attachedActivitiesContainer'>
                {routine.activities.map(activity => {
                  const { id, name, description, count, duration } = activity;
                  return (
                    <ListGroup.Item key={id} className='m-1'>
                      <Card.Title>Name: {name}</Card.Title>
                      <Card.Text>Description: {description}</Card.Text>
                      <Row>
                        <Col>
                          <Card.Text>Count: {count}</Card.Text>
                        </Col>
                        <Col>
                          <Card.Text>Duration: {duration}</Card.Text>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            ) : (
              <Card.Title className='text-center mt-4'>
                No activities found
              </Card.Title>
            )}
          </Card> */}

          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => closeModal()}>
              Close
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};

export default ViewRoutine;
