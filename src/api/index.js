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
        username: 'asd',
        password: 'asd2',
      }),
    }).then(response => response.json());
  } catch (err) {
    console.error(err);
  }
};


export const register = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(err)
  }
}