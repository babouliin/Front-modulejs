import axios from 'axios';
import { headers } from './APIHeader';

const burl = process.env.REACT_APP_API_URL;

const exportedObject = {
  chats() {
    return axios.get(
      `${burl}/chats`,
      { headers },
    ).catch((error) => error.response);
  },

};

export default exportedObject;
