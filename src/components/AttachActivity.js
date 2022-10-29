import React, { useState, useEffect } from 'react';
import { attachActivity, getAllActivities } from '../api';
import {
  Form,
  FloatingLabel,
  Button,
  Modal,
  Row,
  Col,
  Dropdown,
  Alert,
} from 'react-bootstrap';

const AttachActivity = ({ routine, jwt, updateCurrentRoutine }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [duration, setDuration] = useState('');
  const [count, setCount] = useState('');
  const [selectedActivity, setSelectedActivity] = useState({});
  const [selectedActivityName, setSelectedActivityName] = useState('');

  const [activityList, setActivityList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchActivityList = async () => {
    setActivityList(await getAllActivities());
  };

  useEffect(() => {
    fetchActivityList();
  }, []);

  const handleSubmit = async () => {
    if (!count || !duration) {
      console.error('Please set a count and duration for this activity');
      setErrorMessage('Please set a count and duration for this activity');
      return;
    }
    const activity = selectedActivity;
    selectedActivity.count = count;
    selectedActivity.duration = duration;
    const result = await attachActivity(activity, routine, jwt);

    if (!result.error) {
      setSuccessMessage('Activity Added!');
      setErrorMessage('');
      setTimeout(() => {
        closeModal();
        updateCurrentRoutine();
      }, 1000);
    } else {
      console.error(result.error);
      setErrorMessage('Activity Already Added!');
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setSuccessMessage('');
          setDuration('');
          setCount('');
          setSelectedActivityName('');
          setSelectedActivity('');
          setErrorMessage('');
          openModal();
        }}>
        Add Activity
      </Button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header style={{ fontSize: '20px' }} closeButton>
          <Modal.Title className='w-100 text-center'>
            Add Activity to Routine
          </Modal.Title>
        </Modal.Header>

        <Form>
          <Form.Group as={Row} className='m-3'>
            <Col className='p-0' sm='3'>
              <Dropdown>
                <Dropdown.Toggle variant='success'>Activity</Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: '15rem',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    width: '483px',
                  }}>
                  {activityList && activityList.length && (
                    <>
                      <Form.Control
                        autoFocus
                        className='mx-3 my-2 sticky-top'
                        style={{ width: '93%' }}
                        placeholder='Type to filter...'
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                      {activityList.map(activity => {
                        if (
                          activity.name.toLowerCase().startsWith(searchValue)
                        ) {
                          return (
                            <Dropdown.Item
                              key={activity.id}
                              onClick={() => {
                                setSelectedActivity(activity);
                                setSelectedActivityName(activity.name);
                              }}>
                              {activity.name}
                            </Dropdown.Item>
                          );
                        }
                      })}
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col className='p-0' sm='9'>
              <Form.Control
                id='activityToAttach'
                placeholder='Activity Name'
                plaintext
                disabled
                value={selectedActivityName}
              />
            </Col>
          </Form.Group>

          <Form.Group className='m-3' as={Row}>
            <Col className='ps-0 pe-1'>
              <FloatingLabel label='Count'>
                <Form.Control
                  id='activityCount'
                  placeholder='Count'
                  required
                  onChange={e => setCount(e.target.value)}
                  value={count}
                />
              </FloatingLabel>
            </Col>
            {/* </Form.Group>

          <Form.Group className='m-3'> */}
            <Col className='ps-1 pe-0'>
              <FloatingLabel label='Duration'>
                <Form.Control
                  id='activityDuration'
                  placeholder='Duration'
                  required
                  onChange={e => setDuration(e.target.value)}
                  value={duration}
                />
              </FloatingLabel>
            </Col>
          </Form.Group>

          {/* <Form.Group className='m-3'>
            <Form.Check
              id='routineIsPublic'
              type='checkbox'
              label='Public'
              onChange={e => {
                setNewIsPublic(e.target.checked);
              }}
              checked={newIsPublic}
            />
          </Form.Group> */}

          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button variant='success' onClick={() => handleSubmit()}>
              Add Activity
            </Button>
          </Form.Group>
        </Form>
        {/* </Card> */}
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
        {successMessage && (
          <Alert variant='success' className='mt-3'>
            {successMessage}
          </Alert>
        )}
      </Modal>
    </>
  );
};

export default AttachActivity;
