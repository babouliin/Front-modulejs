import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from '../component/Layout';

const PageTwo = () => (
  <Layout className="app-camearadetails" isHeader>
    <h1>Welcome to Page Two</h1>
    <Link to="/home">Home</Link>
    <Link to="/page-1" className="ml-3">Page_One</Link>
  </Layout>
);

export default PageTwo;
