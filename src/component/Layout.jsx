import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ className, isHeader, children }) => {
  const nameClass = className !== undefined ? className : '';

  return (
    <main className={`app-layout ${nameClass}`}>
      {isHeader && <Header />}
      <Container fluid>
        {children}
      </Container>

    </main>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
  isHeader: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

Layout.defaultProps = {
  className: '',
  isHeader: true,
  children: {},
};

export default Layout;
