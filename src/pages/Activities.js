import React from 'react';

const Activities = () => {

  return  (
    
    <div>
      <h1>Activities</h1>
      <div id='outer div element'>
        {

          activitiesToDisplay.map((activity) => {
            const {activityId, name, description} = activity;
            return (
              <div key={activityId}>
                <h1>{name}</h1>
                <h3>Description:</h3> <p>{description}</p>
              </div>
            )
          })
        }
        
       
      </div>
      </div>
  ) 
  
};
console.log(Activities)
export default Activities;
