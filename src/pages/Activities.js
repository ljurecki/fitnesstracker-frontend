
import React, { useState, useEffect } from 'react';
import { getAllActivities } from '../api';



const Activities = () => {

  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);

  async function allActivities() {
    setActivitiesToDisplay(await getAllActivities());
  }

  useEffect(() => {
    allActivities();
  }, []);
  console.log(activitiesToDisplay)

  return (

    <div>
      <h1>Activities</h1>
      <div id='outer div element'>
        {activitiesToDisplay ? (

          activitiesToDisplay.map((activity) => {
            const { activityId, name, description } = activity;
            return (
              <div key={activityId}>
                <h1>{name}</h1>
                <h3>Description:</h3> <p>{description}</p>
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
