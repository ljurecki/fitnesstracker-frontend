import React, { useEffect, useState } from 'react';
import {
  getRoutinesByUsername,
  getPublicRoutines,
  deleteRoutine,
} from '../api';
import { MyRoutines, PublicRoutines, CreateRoutine } from '../components';
import { Tabs, Tab } from 'react-bootstrap';

const Routines = ({ user, jwt, isLoggedIn }) => {
  const [publicRoutines, setPublicRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);

  const fetchAllRoutines = async () => {
    fetchPublicRoutines();
    if (isLoggedIn) {
      fetchMyRoutines(user, jwt);
    }
  };

  const fetchPublicRoutines = async () => {
    setPublicRoutines(await getPublicRoutines());
  };

  const fetchMyRoutines = async (user, jwt) => {
    setMyRoutines(await getRoutinesByUsername(user, jwt));
  };

  const deleteSelectedRoutine = async routine => {
    const result = await deleteRoutine(routine, jwt);
    if (!result.error) {
      fetchAllRoutines();
    } else {
      console.error(result.error);
    }
  };

  useEffect(() => {
    fetchAllRoutines();
  }, [user]);

  return (
    <>
      <Tabs
        defaultActiveKey={isLoggedIn ? 'my-routines' : 'public-routines'}
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey='public-routines' title='Public Routines'>
          <PublicRoutines
            publicRoutines={publicRoutines}
            isLoggedIn={isLoggedIn}
            user={user}
            deleteSelectedRoutine={deleteSelectedRoutine}
          />
        </Tab>
        {isLoggedIn && (
          <Tab eventKey='my-routines' title='My Routines'>
            <MyRoutines
              myRoutines={myRoutines}
              deleteSelectedRoutine={deleteSelectedRoutine}
            />
          </Tab>
        )}
      </Tabs>

      {isLoggedIn && (
        <CreateRoutine jwt={jwt} fetchAllRoutines={fetchAllRoutines} />
      )}
    </>
  );
};

export default Routines;
