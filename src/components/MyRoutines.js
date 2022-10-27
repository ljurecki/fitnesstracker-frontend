import React from 'react';
import { ListGroup, Button, Card } from 'react-bootstrap';

const MyRoutines = ({ myRoutines }) => {
  return (
    <ListGroup variant='flush'>
      {/* <InputGroup className='p-2 text-white bg-dark'>
            <Form.Control
              placeholder='Search Posts'
              onChange={e => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Button variant='info' onClick={() => setSearchTerm('')}>
              Clear
            </Button>
          </InputGroup> */}
      {myRoutines && myRoutines.length ? (
        myRoutines.map(routine => {
          const { id, creatorName, name, goal } = routine;

          return (
            <ListGroup.Item key={id} className='px-0 py-3 mx-3'>
              <Card.Title as='h2'>{name}</Card.Title>
              <Card.Text>Goal: {goal}</Card.Text>
              <Card.Text>Creator: {creatorName}</Card.Text>
              {/* {isLoggedIn && (
                    <>
                      {author._id === userId ? (
                        <>
                          <Link to={`/posts/${_id}`} state={{ post: post }}>
                            <Button variant='info'>Edit post</Button>
                          </Link>
                          <Button
                            variant='danger'
                            onClick={() => handleDelete(post)}
                            className='mx-2'>
                            Delete
                          </Button>
                        </>
                      ) : (
                        <>
                          <MessageForm post={post} jwt={jwt} />
                        </>
                      )}
                    </>
                  )} */}
            </ListGroup.Item>
          );
        })
      ) : (
        <h3 className='text-center mt-4'>No Routines Found</h3>
      )}
    </ListGroup>
  );
};

export default MyRoutines;
