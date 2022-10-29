import React, { useState, useEffect } from 'react';
import {
  attachActivity,
  getAllActivities,
  getRoutinesByUsername,
  updateRoutine,
} from '../api';
import {
  Form,
  FloatingLabel,
  Button,
  Modal,
  Row,
  Col,
  Dropdown,
} from 'react-bootstrap';

const AttachActivity = ({ routine, jwt, user, setCurrentRoutine }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [duration, setDuration] = useState('');
  const [count, setCount] = useState('');
  const [selectedActivity, setSelectedActivity] = useState({});
  const [selectedActivityName, setSelectedActivityName] = useState('');

  const [activityList, setActivityList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const fetchActivityList = async () => {
    setActivityList(await getAllActivities());
  };

  const updateCurrentRoutine = async () => {
    const updatedRoutines = await getRoutinesByUsername(user, jwt);
    const [updatedRoutine] = updatedRoutines.filter(
      _routine => _routine.id === routine.id
    );
    setCurrentRoutine(updatedRoutine);
  };

  useEffect(() => {
    fetchActivityList();
  }, []);

  const handleSubmit = async () => {
    if (!count || !duration) {
      console.error('Please set a count and duration for this activity');
      return;
    }
    const activity = selectedActivity;
    selectedActivity.count = count;
    selectedActivity.duration = duration;
    const result = await attachActivity(activity, routine, jwt);
    if (!result.error) {
      closeModal();
      updateCurrentRoutine();
    } else {
      console.error(result.error);
    }
  };

  return (
    <>
      <Button
        // variant='success'
        // className='position-fixed sticky-bottom rounded-pill shadow'
        // size='lg'
        // style={{ bottom: '25px', right: '25px' }}
        onClick={() => {
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
        {/* <Card className='flex-fill mt-3 mx-5 shadow'> */}
        {/* <Card.Header
            as='h3'
            className='text-center'
            style={{ backgroundColor: '#0D6EFD', color: '#fff' }}>
            Add Activity
          </Card.Header> */}
        <Form
        // onSubmit={e => {
        //   e.preventDefault();
        //   handleSubmit();
        // }}
        >
          <Form.Group as={Row} className='m-3'>
            <Col className='p-0' sm='3'>
              <Dropdown>
                <Dropdown.Toggle variant='success'>Activity</Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: '15rem',
                    overflow: 'scroll',
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
            {/* <Button
              variant='secondary'
              className='mx-2'
              onClick={() => navigate('/routines')}>
              Cancel
            </Button> */}
          </Form.Group>
          {/* {errorMessage && (
            <Alert variant='danger'>Sorry, Routine Name Already Exists!</Alert>
          )} */}
        </Form>
        {/* </Card> */}
      </Modal>
    </>
  );
};

export default AttachActivity;
