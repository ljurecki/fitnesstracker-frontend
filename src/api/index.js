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

export const createActivity = async () => {};
