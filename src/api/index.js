// const BASE_URL = 'https://young-mountain-90825.herokuapp.com/api';
const BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api';

const createHeaders = jwt => {
  return jwt
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};

export const login = async (username, password) => {
  const headers = createHeaders();
  try {
    return await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const register = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getUserData = async jwt => {
  const headers = createHeaders(jwt);
  try {
    return await fetch(`${BASE_URL}/users/me`, {
      headers,
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const getAllActivities = async () => {
  try {
    return await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const getPublicRoutines = async () => {
  try {
    const headers = createHeaders();
    return await fetch(`${BASE_URL}/routines`, {
      headers,
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const getRoutinesByUsername = async (user, jwt) => {
  try {
    const headers = createHeaders(jwt);
    const { username } = user;
    return await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers,
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const createRoutine = async ({ name, goal, isPublic }, jwt) => {
  try {
    const headers = createHeaders(jwt);
    return await fetch(`${BASE_URL}/routines`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const updateRoutine = async (updatedRoutine, jwt) => {
  try {
    const headers = createHeaders(jwt);
    return await fetch(`${BASE_URL}/routines/${updatedRoutine.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updatedRoutine),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const deleteRoutine = async (routine, jwt) => {
  try {
    const headers = createHeaders(jwt);
    return await fetch(`${BASE_URL}/routines/${routine.id}`, {
      method: 'DELETE',
      headers,
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const attachActivity = async (activity, routine, jwt) => {
  try {
    const headers = createHeaders(jwt);
    return await fetch(`${BASE_URL}/routines/${routine.id}/activities`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        activityId: activity.id,
        count: activity.count,
        duration: activity.duration,
      }),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const createActivity = async (jwt, user, { name, description }) => {
  try {
    const headers = createHeaders(jwt);
    return await fetch(`${BASE_URL}/activities`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        user,
        name: name,
        description: description,
      }),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};

export const updateActivity = async (jwt, { id, name, description }) => {
  try {
    const headers = createHeaders(jwt);
    return await fetch(`${BASE_URL}/activities/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        name: name,
        description: description,
      }),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};
