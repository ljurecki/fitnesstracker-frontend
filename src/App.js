import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import { Navbar } from './components';
import {
  Home,
  Login,
  Routines,
  EditRoutine,
  Activities,
  Register,
  UpdateActivity,
} from './pages';
import { getUserData } from './api';

const App = () => {
  const [jwt, setJwt] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function logOut() {
    window.localStorage.removeItem('jwt');
    setJwt('');
    setUser({});
    setIsLoggedIn(false);
  }

  async function persistLogin() {
    if (window.localStorage.getItem('jwt')) {
      setJwt(window.localStorage.getItem('jwt'));
    }
    if (jwt) {
      setIsLoggedIn(true);
      const response = await getUserData(jwt);
      if (!response.error) {
        setUser(response);
      } else {
        console.error(response.error);
      }
    }
  }

  useEffect(() => {
    persistLogin();
  }, [jwt]);

  return (
    <>
      <div className='sticky-top'>
        <Navbar isLoggedIn={isLoggedIn} logOut={logOut} navigate={navigate} />
      </div>
      <Container className='px-0' fluid id='main-app'>
        <Routes>
          <Route path='/' element={<Home id='Home' /* user={user} */ />} />
          <Route
            path='/routines'
            element={
              <Routines
                user={user}
                jwt={jwt}
                isLoggedIn={isLoggedIn}
                // navigate={navigate}
              />
            }
          />
          <Route
            path='/routines/:routineId'
            element={
              <EditRoutine navigate={navigate} jwt={jwt} /* user={user}   */ />
            }
          />
          <Route
            path='/activities'
            element={<Activities jwt={jwt} user={user} navigate={navigate} />}
          />
          <Route
            path='/activities/:activityId'
            element={<UpdateActivity jwt={jwt} navigate={navigate} />}
          />
          <Route path='/register' element={<Register navigate={navigate} />} />
          <Route
            path='/login'
            element={<Login setJwt={setJwt} navigate={navigate} />}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
