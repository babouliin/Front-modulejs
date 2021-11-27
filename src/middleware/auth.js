/* Authetifacation actions */
import { message } from 'antd';

// LOGIN
export const login = (props) => {
  props.history.push('/home');
  message.success('Login Success');
};

// SIGNUP
export const signup = (props) => {
  props.history.push('/home');
  message.success('signup Success');
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem('email');
  message.success('Logout Success');
};

// LOGIN STATUS
export const isLogin = () => {
  if (localStorage.getItem('email')) return true;
  return false;
};
