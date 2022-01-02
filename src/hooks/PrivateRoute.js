import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLogin } from '../middleware/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...rest} render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/" />)} />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};

PrivateRoute.defaultProps = {
  component: {},
};

export default PrivateRoute;
