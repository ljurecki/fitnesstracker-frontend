import React, { useState, useEffect } from 'react';
import { getAllActivities } from '../api';
import { ActivityForm, EditActivity } from '../components';
import { Modal, Button } from 'react-bootstrap';

const Activities = ({ jwt, user }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);

  async function allActivities() {
    setActivitiesToDisplay(await getAllActivities());
  }

  useEffect(() => {
    allActivities();
  }, []);

  return (

    <div>
      <h1>Activities</h1>

      {
        jwt ? (
          <Button variant="primary" onClick={handleShow}>
            Create an Activity
          </Button>) : (null)
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body><ActivityForm user={user} jwt={jwt} /> </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>



      <div id='outer div element'>
        {activitiesToDisplay ? (

          activitiesToDisplay.map((activity) => {
            const { id, name, description } = activity;
            return (
              <div key={id}>
                <h1>{name}</h1>
                <h3>Description:</h3> <p>{description}</p>

                {
                  jwt ? (
                    <Button variant="primary" onClick={handleShow}>
                      Edit Activity
                    </Button>) : (null)
                }

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Activity</Modal.Title>
                  </Modal.Header>
                  <Modal.Body><EditActivity user={user} jwt={jwt} /> </Modal.Body>
                  <Modal.Footer>

                  </Modal.Footer>
                </Modal>


              </div>
            )
          }))
          : (<h1>No Activities Found!</h1>)
        }



      </div>
    </div>
  )

};

export default Activities;
