import { message } from 'antd';
import socket from '../socket';

export const login = (props) => {
  props.history.push('/home');
  message.success('Login Success');
};

export const signup = (props) => {
  props.history.push('/home');
  message.success('Signup Success');
};

export const logout = () => {
  localStorage.removeItem('email');
  socket.off('connect_error');
  socket.off('session');
  // socket.disconnect();
  socket.emit('disconnect', 'client namespace disconnect');
  message.success('Logout Success');
};

export const isLogin = () => {
  if (localStorage.getItem('email')) return true;
  return false;
};
