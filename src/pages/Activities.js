import React, { useState, useEffect } from 'react';
import { getAllActivities } from '../api';
import { ActivityForm } from '../components';
import { Button, Card, ListGroup, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Activities = ({ jwt, user }) => {
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);

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
        <Tab eventKey="activities" title="Activity"></Tab>
      </Tabs>
      
      <ListGroup variant='flush'>
        {jwt && (
          <ActivityForm user={user} jwt={jwt} />
        )}

        {
          activitiesToDisplay ? (
          activitiesToDisplay.map(activity => {
            const { id, name, description } = activity;
            return (
              <ListGroup.Item key={id} className='px-0 py-3 mx-3'>
                <Card.Title as='h2'>{name}</Card.Title>
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
    </>
  );
};

export default Activities;
