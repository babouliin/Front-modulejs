import React from 'react';
import {
  Tabs, Tab,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Media from 'react-media';
import Layout from '../component/Layout';
import LoginComponent from '../component/LoginComponent';
import SignupComponent from '../component/SignupComponent';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Layout className="app-login" isHeader>
      <div className="row col-12 m-0 p-0" style={{ minHeight: '100vh' }}>
        <Media
          query="(min-width: 925px)"
          render={() => (
            <div className="col-3" />
          )}
        />
        <Media queries={{ small: '(max-width: 925px)', medium: '(min-width: 925px)' }}>
          {(matches) => (
            <>
              { matches.small
              && (
                <div className="col-12 p-4" style={{ maxHeight: 'inherit' }}>
                  <Tabs fill defaultActiveKey="login" id="uncontrolled-tab-example" style={{ maxHeight: 'inherit', marginTop: '70px' }}>
                    <Tab eventKey="login" title={t('login')}>
                      <LoginComponent />
                    </Tab>
                    <Tab eventKey="signup" title={t('signup')}>
                      <SignupComponent />
                    </Tab>
                  </Tabs>
                </div>
              )}
              { matches.medium
              && (
                <div className="col-6 p-4" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                  <Tabs fill defaultActiveKey="login" id="uncontrolled-tab-example" style={{ marginTop: '70px' }}>
                    <Tab eventKey="login" title={t('login')} style={{ maxHeight: 'inherit' }}>
                      <LoginComponent />
                    </Tab>
                    <Tab eventKey="signup" title={t('signup')}>
                      <SignupComponent />
                    </Tab>
                  </Tabs>
                </div>
              )}
            </>
          )}
        </Media>
      </div>
    </Layout>
  );
};

export default Login;
