import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home, Login, Routines, Activities, Register } from './pages';

const App = () => {
  const [jwt, setJwt] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [activities, setActivities] = useState({});
  const navigate = useNavigate();

  function logOut() {
    // window.localStorage.removeItem('jwt');
    // setJwt('');
    // setUser({});
    // setIsLoggedIn(false);
  }

  async function persistLogin() {
    // if (window.localStorage.getItem('jwt')) {
    //   setJwt(window.localStorage.getItem('jwt'));
    // }
    // if (jwt) {
    //   setIsLoggedIn(true);
    //   const response = await getUserData(jwt);
    //   if (response.success) {
    //     setUser(response.data);
    //   } else {
    //     console.error('User data not found');
    //   }
    // }
  }

  async function fetchActivities() {
    const results = await getAllActivities(jwt)
    setActivities(results.data.activities);
}

  // useEffect(() => {
  //   persistLogin();
  // }, [jwt]);

  return (
    <>
      {/* <div className='sticky-top'>
        <Navbar isLoggedIn={isLoggedIn} logOut={logOut} />
      </div> */}
      <Container className='px-0' fluid id='main-app'>
        <Routes>
          <Route path='/' element={<Home id='Home' /* user={user} */ />} />
          <Route
            path='/routines'
            element={
              <Routines
              // user={user}
              // isLoggedIn={isLoggedIn}
              // jwt={jwt}
              // navigate={navigate}
              />
            }
          />
          {/* <Route
            path='/routines/:routineId'
            element={<EditRoutine user={user} navigate={navigate} jwt={jwt} />}
          /> */}
          <Route
            path='/activities'
            element={<Activities /* user={user} */ />}
          />
          <Route
            path='/register'
            element={<Register setJwt={setJwt} navigate={navigate} />}
          />
          <Route
            path='/login'
            element={<Login /* setJwt={setJwt} navigate={navigate} */ />}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
