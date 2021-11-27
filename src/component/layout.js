import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './header';

const Layout = ({ className, isHeader, children }) => (

  <main className={`app-layout ${className !== undefined ? className : ''}`}>
    {isHeader && <Header />}
    <Container fluid>
      {children}
    </Container>

  </main>
);

Layout.propTypes = {
  className: PropTypes.string,
  isHeader: PropTypes.bool,
  children: PropTypes.element,
};

Layout.defaultProps = {
  className: '',
  isHeader: true,
  children: {},
};

export default Layout;
