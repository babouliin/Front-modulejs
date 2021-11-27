import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from '../component/layout';

const Home = () => (
  <Layout className="app-home" isHeader>
    <h1>Welcome to Home</h1>
    <Link to="/page-1">Page_One</Link>
    <Link to="/page-2" className="ml-3">Page_Two</Link>
  </Layout>
);

export default Home;
