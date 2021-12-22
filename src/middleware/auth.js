import { message } from 'antd';

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
  message.success('Logout Success');
};

export const isLogin = () => {
  if (localStorage.getItem('email')) return true;
  return false;
};
