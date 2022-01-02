import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isLogin } from '../middleware/auth';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
  // restricted = false meaning public route
  // restricted = true meaning restricted route
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...rest} render={(props) => (isLogin() && restricted ? <Redirect to="/home" /> : <Component {...props} />)} />
);

PublicRoute.propTypes = {
  component: PropTypes.elementType,
  restricted: PropTypes.bool,
};

PublicRoute.defaultProps = {
  component: {},
  restricted: false,
};

export default PublicRoute;
