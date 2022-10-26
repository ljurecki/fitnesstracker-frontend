import React, { useEffect, useState } from 'react';
import { getMyRoutines, getPublicRoutines } from '../api';
import { MyRoutines, PublicRoutines } from '../components';
import { Tabs, Tab } from 'react-bootstrap';

const Routines = ({ user }) => {
  const [publicRoutines, setPublicRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);

  const fetchPublicRoutines = async () => {
    setPublicRoutines(await getPublicRoutines());
  };

  const fetchMyRoutines = async user => {
    setMyRoutines(await getMyRoutines);
  };

  useEffect(() => {
    fetchPublicRoutines();
    fetchMyRoutines();
  }, [user]);

  // console.log(publicRoutines);

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
        {user && (
          <Tab eventKey='my-routines' title='My Routines'>
            <MyRoutines myRoutines={myRoutines} />
          </Tab>
        )}
      </Tabs>
    </>
  );
};

export default Routines;
