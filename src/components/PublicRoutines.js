import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';

const PublicRoutines = ({ publicRoutines }) => {
  return (
    <>
      {/* {publicRoutines ? (
        publicRoutines.map(routine => {
          const { id, creatorName, name, goal } = routine;

          return (
            <div key={id}>
              <h1>{name}</h1>
              <p>Goal: {goal}</p>
              <p>Creator: {creatorName}</p>
            </div>
          );
        })
      ) : (
        <h3>No public routines found</h3>
      )} */}
      {publicRoutines.length ? (
        publicRoutines.map(routine => {
          const { id, creatorName, name, goal } = routine;

          return (
            <ListGroup.Item key={id} className='px-0 py-3 mx-3'>
              <Card.Title as='h2'>{name}</Card.Title>
              <Card.Text>Goal: {goal}</Card.Text>
              <Card.Text>Creator Name: {creatorName}</Card.Text>
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
    </>
  );
};

export default PublicRoutines;
