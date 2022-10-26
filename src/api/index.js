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

export const createActivity = async () => {};

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

export const getRoutinesByUsername = async user => {
  try {
    const headers = createHeaders();
    const { username } = user;
    return await fetch(`${BASE_URL}/${username}/routines`, {
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
