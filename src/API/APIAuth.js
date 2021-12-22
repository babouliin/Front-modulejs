import axios from 'axios';
import { headers } from './APIHeader';

const burl = process.env.REACT_APP_API_URL;

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
