import React from 'react';
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { deleteRoutineActivity } from '../api';

const RoutineActivities = ({ routine, jwt }) => {
  // const [parsedActivities, setParsedActivities] = useState(routine.activities);

  // const parseActivities = () => {
  //   setParsedActivities(routine.activities.map(activity => activity));
  // };

  // useEffect(() => {
  //   parseActivities();
  // }, [routine.activities]);

  const handleDelete = async routineActivityId => {
    const result = await deleteRoutineActivity(routineActivityId, jwt);
    console.log(result);
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
            return (
              <ListGroup.Item key={id} className='m-1'>
                <Card.Title>Name: {name}</Card.Title>
                <Card.Text>Description: {description}</Card.Text>
                <Row className='d-flex align-items-center'>
                  <Col>
                    <Card.Text>Count: {count}</Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>Duration: {duration}</Card.Text>
                  </Col>
                  <Col className='flex-grow-0'>
                    <Button
                      variant='danger'
                      onClick={() => {
                        if (confirm('Are you sure you want to delete?')) {
                          handleDelete(routineActivityId);
                        }
                      }}>
                      Delete
                    </Button>
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
