import React, { useState } from 'react';
import {
  Card,
  ListGroup,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import { updateRoutineActivity, deleteRoutineActivity } from '../api';

const RoutineActivities = ({ routine, jwt, updateCurrentRoutine, user }) => {
  // const [parsedActivities, setParsedActivities] = useState(routine.activities);

  // const parseActivities = () => {
  //   setParsedActivities(routine.activities.map(activity => activity));
  // };

  // useEffect(() => {
  //   parseActivities();
  // }, [routine.activities]);

  const handleUpdate = async (count, duration, id) => {
    if (!count || !duration) {
      console.error('Please set a count and duration for this activity');
      return false;
    } else {
      const result = await updateRoutineActivity({ count, duration, id }, jwt);
      if (!result.error) {
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
          {routine.activities.map(activity => {
            const {
              id,
              name,
              description,
              count,
              duration,
              routineActivityId,
            } = activity;

            const [currentCount, setCurrentCount] = useState(count);
            const [currentDuration, setCurrentDuration] = useState(duration);
            const [toggleEdit, setToggleEdit] = useState(true);
            const toggleFields = () => setToggleEdit(!toggleEdit);

            return (
              <ListGroup.Item key={id} className='m-1'>
                <Card.Title>Name: {name}</Card.Title>
                <Card.Text>Description: {description}</Card.Text>
                <Row className='d-flex align-items-center'>
                  <Col className='p-0'>
                    <FloatingLabel label='Count'>
                      <Form.Control
                        id='routineActivityCount'
                        placeholder='Count'
                        plaintext={toggleEdit}
                        disabled={toggleEdit}
                        required
                        onChange={e => setCurrentCount(e.target.value)}
                        value={currentCount}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col className='p-0'>
                    <FloatingLabel label='Duration'>
                      <Form.Control
                        id='routineActivityDuration'
                        placeholder='Duration'
                        plaintext={toggleEdit}
                        disabled={toggleEdit}
                        required
                        onChange={e => setCurrentDuration(e.target.value)}
                        value={currentDuration}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col className='d-flex justify-content-end flex-grow-0'>
                    {user && routine.creatorName === user.username && (
                      <>
                        {toggleEdit ? (
                          <Button
                            variant='info'
                            id='EditButton'
                            type='button'
                            onClick={() => toggleFields()}>
                            Edit
                          </Button>
                        ) : (
                          <Button
                            variant='success'
                            id='SaveButton'
                            onClick={async () => {
                              const response = await handleUpdate(
                                currentCount,
                                currentDuration,
                                routineActivityId
                              );
                              if (response) {
                                toggleFields();
                              }
                            }}>
                            Save
                          </Button>
                        )}
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
