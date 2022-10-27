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

const ViewRoutine = ({ routine }) => {
  const [showModal, setShowModal] = useState(false);

  if (routine.activities && routine.activities.length) {
    console.log(routine);
  }

  // const [name, setName] = useState('');
  // const [goal, setGoal] = useState('');
  // const [isPublic, setIsPublic] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    // setName('');
    // setGoal('');
    // setIsPublic(false);
  };

  return (
    <>
      <Button
        variant='success'
        // className='position-fixed sticky-bottom rounded-pill shadow'
        // size='lg'
        // style={{ bottom: '25px', right: '25px' }}
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
        <Form
        // onSubmit={e => {
        //   e.preventDefault();
        //   handleSubmit();
        // }}
        >
          {/* <Form.Group className='m-3'>
            <FloatingLabel label='Name'>
              <Form.Control
                id='routineName'
                // placeholder='Name'
                readOnly
                value={routine.name}
              />
            </FloatingLabel>
          </Form.Group> */}

          <Form.Group className='m-3'>
            <FloatingLabel label='Goal'>
              <Form.Control
                as='textarea'
                id='routineGoal'
                // placeholder='Goal'
                plaintext
                readOnly
                style={{ height: '80px' }}
                // onChange={e => setGoal(e.target.value)}
                defaultValue={routine.goal}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Row} className='m-3'>
            <Col className='p-0'>
              <FloatingLabel label='Creator'>
                <Form.Control
                  id='creatorName'
                  // placeholder='Goal'
                  plaintext
                  readOnly
                  // style={{ height: '80px' }}
                  // onChange={e => setGoal(e.target.value)}
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
                // onChange={e => {
                //   setIsPublic(e.target.checked);
                // }}
                checked={routine.isPublic}
              />
            </Col>
          </Form.Group>

          <Card
            id='attachedActivities'
            variant='flush'
            className='border-top border-bottom border-dark'>
            <ListGroup.Item className='text-center fs-3 mb-1 bg-light'>
              Attached Activities
            </ListGroup.Item>
            {routine.activities && routine.activities.length ? (
              <ListGroup id='attachedActivitiesContainer'>
                {routine.activities.map(activity => {
                  const { name, description, count, duration } = activity;
                  return (
                    <ListGroup.Item className='m-1'>
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
          </Card>

          <Form.Group className='m-3 d-flex justify-content-end'>
            {/* <Button variant='success' type='submit'>
              Create Routine
            </Button> */}
            <Button
              variant='secondary'
              className='mx-2 justify-self-end'
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
