import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Accept-Language': 'en',
};
const burl = process.env.REACT_APP_API_URL;

export function updateHeaders(lang) {
  headers['Accept-Language'] = lang;
}

const exportedObject = {
  login(email, password) {
    return axios.post(
      `${burl}/auth/login`,
      {
        email,
        password,
      }, { headers },
    ).catch((error) => error.response);
  },

  signup(email, password, pseudo) {
    return axios.post(`${burl}/auth/signup`, {
      email,
      password,
      pseudo,
    }, { headers })
      .catch((error) => error.response);
  },

};

export default exportedObject;
