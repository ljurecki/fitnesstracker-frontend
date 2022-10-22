import React from 'react';

const Activities = () => {


  return <div>
    <h1>Activities</h1>
    <div id='outer div element'>
      {
        token ? (
          <button><Link to='/'>Create an Activity</Link></button>
        ) : (
          null
        )
      }
      {
        activitiesToDisplay.map((activity) => {
          const { name, description, _id } = activity;
          return (
            <div key={_id}>
              <h1>{name}</h1>
              <h3>Description:</h3> <p>{description}</p>
            </div>
          )
        })
      }
    </div></div>
};

export default Activities;
