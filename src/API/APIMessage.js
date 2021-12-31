import axios from 'axios';
import { headers } from './APIHeader';

const burl = process.env.REACT_APP_API_URL;

const exportedObject = {
  messages(chatId) {
    return axios.get(
      `${burl}/messages?chatId=${chatId}`,
      { headers },
    ).catch((error) => error.response);
  },

};

export default exportedObject;
