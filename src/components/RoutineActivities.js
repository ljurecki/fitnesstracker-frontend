import React, { useState } from 'react';
import {
  Card,
  ListGroup,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Alert
} from 'react-bootstrap';
import { updateRoutineActivity, deleteRoutineActivity } from '../api';



const RoutineActivities = ({ routine, jwt, updateCurrentRoutine, user }) => {

  const handleUpdate = async (count, duration, id) => {
    if (!count || !duration) {
      console.error('Please set a count and duration for this activity');
      return false;
    } else {
      const result = await updateRoutineActivity({ count, duration, id }, jwt);
      if (!result.error) {
        await updateCurrentRoutine();
        return true;
      } else {
        console.error(result.error);
        return false;
      }
    }
  };

  const handleDelete = async routineActivityId => {
    const result = await deleteRoutineActivity(routineActivityId, jwt);
    if (!result.error) {
      updateCurrentRoutine();
    } else {
      console.error(result.error);
    }
  };

  return (
    <Card
      id='attachedActivities'
      variant='flush'
      className='border-top border-bottom border-dark'>
      <ListGroup.Item className='text-center fs-3 mb-1 bg-light'>
        Attached Activities
      </ListGroup.Item>
      {routine.activities && routine.activities.length ? (
        <ListGroup id='attachedActivitiesContainer'>
          {routine.activities.map((activity, index) => {
            const { id, name, description, routineActivityId } = activity;
            let { count, duration } = activity;

            const countElementId = 'routineCount' + index;
            const durationElementId = 'routineDuration' + index;
            const editButtonId = 'EditButton' + index;
            const saveButtonId = 'SaveButton' + index;
            const routineActivityErrorId = 'routineActivityError' + index;
            let blockEdits = true;

            const routineActivityError = document.getElementById(routineActivityErrorId);

            const toggleFields = () => {
              const countField = document.getElementById(countElementId);
              const durationField = document.getElementById(durationElementId);
              const editButton = document.getElementById(editButtonId);
              const saveButton = document.getElementById(saveButtonId);

              blockEdits = !blockEdits;
              countField.readOnly = blockEdits;
              durationField.readOnly = blockEdits;
              if (blockEdits) {
                countField.classList = 'form-control-plaintext';
                durationField.classList = 'form-control-plaintext';
              } else {
                countField.classList = 'form-control';
                durationField.classList = 'form-control';
              }
              editButton.hidden = !blockEdits;
              saveButton.hidden = blockEdits;
            };

            return (
              <ListGroup.Item key={id} className='m-1'>
                <Card.Title>Name: {name}</Card.Title>
                <Card.Text>Description: {description}</Card.Text>
                <Row className='d-flex align-items-center'>
                  <Col className='p-0'>
                    <FloatingLabel label='Count'>
                      <Form.Control
                        id={countElementId}
                        placeholder='Count'
                        plaintext={blockEdits}
                        readOnly={blockEdits}
                        required
                        onChange={e => (count = e.target.value)}
                        defaultValue={count}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col className='p-0'>
                    <FloatingLabel label='Duration'>
                      <Form.Control
                        id={durationElementId}
                        placeholder='Duration'
                        plaintext={blockEdits}
                        readOnly={blockEdits}
                        required
                        onChange={e => (duration = e.target.value)}
                        defaultValue={duration}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col className='d-flex justify-content-end flex-grow-0'>
                    {user && routine.creatorName === user.username && (
                      <>
                        <Button
                          variant='info'
                          id={editButtonId}
                          type='button'
                          hidden={!blockEdits}
                          onClick={() => toggleFields()}>
                          Edit
                        </Button>
                        <Button
                          variant='success'
                          id={saveButtonId}
                          hidden={blockEdits}
                          onClick={async () => {
                            const response = await handleUpdate(
                              count,
                              duration,
                              routineActivityId
                            );
                            if (response) {
                              toggleFields();
                              routineActivityError.innerText = '';
                              routineActivityError.hidden = true;
                            } else {
                              routineActivityError.innerText = 'Please set a count and duration for this activity';
                              routineActivityError.hidden = false;
                            }
                          }}>
                          Save
                        </Button>
                        <Button
                          variant='danger'
                          className='ms-2'
                          onClick={() => {
                            if (confirm('Are you sure you want to delete?')) {
                              handleDelete(routineActivityId);
                            }
                          }}>
                          Delete
                        </Button>
                      </>
                    )}
                  </Col>
                  <Alert variant='danger' hidden={blockEdits} id={routineActivityErrorId}> </Alert>
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
  );
};

export default RoutineActivities;
