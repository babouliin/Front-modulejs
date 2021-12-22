import axios from 'axios';
import { headers } from './APIHeader';

const burl = process.env.REACT_APP_API_URL;

const exportedObject = {
  users() {
    return axios.get(
      `${burl}/users`,
      { headers },
    ).catch((error) => error.response);
  },
  user(pseudo, password) {
    return axios.put(
      `${burl}/user`,
      {
        pseudo,
        password,
      },
      { headers },
    ).catch((error) => error.response);
  },

};

export default exportedObject;
