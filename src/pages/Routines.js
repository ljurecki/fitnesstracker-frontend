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

  const fetchMyRoutines = async (user, jwt) => {
    setMyRoutines(await getRoutinesByUsername(user, jwt));
  };

  useEffect(() => {
    fetchPublicRoutines();
    if (isLoggedIn) {
      fetchMyRoutines(user, jwt);
    }
  }, [user]);

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
            isLoggedIn={isLoggedIn}
            user={user}
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
        />
      )}
    </>
  );
};

export default Routines;
