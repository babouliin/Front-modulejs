import { message } from 'antd';
import socket from '../socket';

export const login = (props, mess) => {
  props.history.push('/home');
  message.success(mess);
};

export const signup = (props, mess) => {
  props.history.push('/home');
  message.success(mess);
};

export const logout = (mess) => {
  localStorage.removeItem('token');
  socket.disconnect();
  message.success(mess);
};

export const isLogin = () => {
  if (localStorage.getItem('token')) return true;
  return false;
};
