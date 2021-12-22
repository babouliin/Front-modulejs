import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useTranslation } from 'react-i18next';
import Layout from '../component/Layout';

const NoMatch = () => {
  const { t } = useTranslation();

  return (
    <Layout className="app-404" isHeader={false}>
      <h1>{t('pageNotFound')}</h1>
      <Link to="/page-1">{t('backToHome')}</Link>
    </Layout>
  );
};

export default NoMatch;
