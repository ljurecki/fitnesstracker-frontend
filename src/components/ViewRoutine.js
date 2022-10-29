import React, { useState } from 'react';
import { Button, Modal, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
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

          <RoutineActivities routine={routine} />

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
