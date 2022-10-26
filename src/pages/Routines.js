import React, { useEffect, useState } from 'react';
import { getRoutinesByUsername, getPublicRoutines } from '../api';
import { MyRoutines, PublicRoutines, CreateRoutine } from '../components';
import { Tabs, Tab } from 'react-bootstrap';

const Routines = ({ user, jwt, isLoggedIn }) => {
  const [publicRoutines, setPublicRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);

  const fetchPublicRoutines = async () => {
    setPublicRoutines(await getPublicRoutines());
  };

  const fetchMyRoutines = async user => {
    setMyRoutines(await getRoutinesByUsername(user));
  };

  useEffect(() => {
    fetchPublicRoutines();
    if (isLoggedIn) {
      fetchMyRoutines(user);
    }
  }, [user]);

  // console.log(user);

  return (
    <>
      <Tabs
        defaultActiveKey='public-routines'
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey='public-routines' title='Public Routines'>
          <PublicRoutines
            publicRoutines={publicRoutines}
            // isLoggedIn={isLoggedIn}
            // jwt={jwt}
            // navigate={navigate}
          />
        </Tab>
        {isLoggedIn && (
          <Tab eventKey='my-routines' title='My Routines'>
            <MyRoutines myRoutines={myRoutines} />
          </Tab>
        )}
      </Tabs>

      {isLoggedIn && (
        <CreateRoutine
          jwt={jwt}
          // fetchPosts={fetchPosts}
          // fetchMyPosts={fetchMyPosts}
        />
      )}
    </>
  );
};

export default Routines;
