/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import {
  FormControl, Tabs, Tab, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import Media from 'react-media';
import Roules from '../util/rules';
import { login, signup } from '../middleware/auth';
import Layout from '../component/Layout';
import APIAuth from '../API/APIAuth';
import { updateHeadersToken } from '../API/APIHeader';

const Login = (props) => {
  const [state, setState] = useState({

    loginEmail: '',
    loginPassword: '',
    loginError: '',
    loginStayLog: false,
    loginLoading: false,

    signupEmail: '',
    signupPseudo: '',
    signupPassword: '',
    signupPasswordConfirmation: '',
    signupLoading: false,

    signupEmailError: '',
    signupPseudoError: '',
    signupPasswordError: '',
    signupPasswordConfirmationError: '',
    signupError: '',

  });
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(['user']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginErr = async () => {
    let invalid = false;
    let error = '';
    const { loginEmail, loginPassword } = state;
    setState({ ...state, loginLoading: true });

    console.log('login');
    console.log(loginEmail);
    console.log(loginPassword);

    if (!loginEmail || loginEmail.length === 0) {
      error = t('errorWithoutEmail');
      invalid = true;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(loginEmail)) {
      error = t('errorLoginInvalid');
      invalid = true;
    } else if (!loginPassword || loginPassword.length === 0) {
      error = t('errorWithoutPassword');
      invalid = true;
    } else if (loginPassword.length < 8 || !/\d/.test(loginPassword) || !/[a-zA-Z]/.test(loginPassword)) {
      error = t('errorLoginInvalid');
      invalid = true;
    } else {
      error = '';
    }

    if (invalid) {
      setState({ ...state, loginLoading: false, loginError: error });
      return;
    }

    localStorage.setItem('email', loginEmail);
    setState({ ...state, loginError: '', loginLoading: false });
    console.log('OK');

    const loginReturn = await APIAuth.login(loginEmail, loginPassword);
    const { data } = loginReturn;
    if (loginReturn.status === 200) {
      console.log(data.token);
      setCookie('Token', data.token, { path: '/' });
      updateHeadersToken(data.token);
      login(props);
    } else {
      message.error(`Login Failed ${data.message}`);
    }
  };

  const handleLoginInput = (target) => {
    if (target.key === 'Enter') loginErr();
  };

  const loginTextBox = () => {
    const {
      loginEmail, loginPassword, loginError, loginLoading,
    } = state;

    return (
      <div className="p-4">
        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
          <label htmlFor="emailLogin" className="mt-2">
            {t('email')}
            <span id="emailLogin" style={{ color: 'red' }}>*</span>
          </label>
          <FormControl
            name="loginEmail"
            value={state.loginEmail}
            placeholder={t('placeHolderEmail')}
            onChange={handleChange}
            type="email"
            className={loginError && loginError.length !== 0
              ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
            style={{ borderRadius: '20px 20px 20px 20px' }}
            onKeyPress={handleLoginInput}
          />
          <div className="invalid-feedback">
            {loginError}
          </div>

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
          <label htmlFor="passLogin" className="mt-2">
            {t('password')}
            <span id="passLogin" style={{ color: 'red' }}>*</span>
          </label>
          <FormControl
            name="loginPassword"
            value={state.loginPassword}
            placeholder={t('placeHolderPassword')}
            onChange={handleChange}
            type="password"
            className="form-control form-control-user"
            style={{ borderRadius: '20px 20px 20px 20px' }}
            onKeyPress={handleLoginInput}
          />
        </div>
        <Button onClick={loginErr} className="btn btn-primary btn-user btn-block col-10 offset-1 mt-4" style={{ backgroundColor: '#254E70' }}>
          {loginLoading
            ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">{t('loadingWaiting')}</span>
              </Spinner>
            ) : t('iLogin')}
        </Button>
      </div>
    );
  };

  // -------------------- LOGIN END -------------------- //

  // -------------------- SIGNUP -------------------- //

  const signupErr = async () => {
    let invalid = false;
    const {
      signupEmail, signupPseudo, signupPassword, signupPasswordConfirmation,
    } = state;

    setState({ ...state, signupLoading: true });

    if (!signupEmail || signupEmail.length === 0) {
      setState({ ...state, signupEmailError: t('errorWithoutEmail') });
      invalid = true;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signupEmail)) {
      setState({ ...state, signupEmailError: t('errorEmailNotValid') });
      invalid = true;
    } else {
      setState({ ...state, signupEmailError: '' });
    }

    if (!signupPseudo || signupPseudo.length === 0) {
      setState({ ...state, signupPseudoError: t('errorWithoutPseudo') });
      invalid = true;
    } else if (signupPseudo.length < 4) {
      setState({ ...state, signupPseudoError: t('errorPseudoNotValid') });
      invalid = true;
    } else {
      setState({ ...state, signupPseudoError: '' });
    }

    if (!signupPassword || signupPassword.length === 0) {
      setState({ ...state, signupPasswordError: t('errorWithoutPassword') });
      invalid = true;
    } else if (signupPassword.length < 8 || !/\d/.test(signupPassword) || !/[a-zA-Z]/.test(signupPassword)) {
      setState({ ...state, signupPasswordError: t('errorPasswordNotValid') });
      invalid = true;
    } else {
      setState({ ...state, signupPasswordError: '' });
    }

    if (signupPassword !== signupPasswordConfirmation) {
      setState({ ...state, signupPasswordConfirmationError: t('errorDifferentPassword') });
      invalid = true;
    } else {
      setState({ ...state, signupPasswordConfirmationError: '' });
    }

    if (invalid) {
      setState({ ...state, signupLoading: false });
      return;
    }

    localStorage.setItem('email', signupEmail);
    setState({ ...state, signupLoading: false, signupError: '' });
    console.log('OK');

    const signupReturn = await APIAuth.signup(signupEmail, signupPassword, signupPseudo);
    const { data } = signupReturn;
    if (signupReturn.status === 201) {
      console.log(data.token);
      setCookie('Token', data.token, { path: '/' });
      updateHeadersToken(data.token);
      signup(props);
    } else {
      message.error(`Signup Failed ${data.message}`);
    }
  };

  const signupTextBox = () => {
    const {
      signupEmail, signupPseudo, signupPassword, signupPasswordConfirmation, signupLoading,
    } = state;
    const {
      signupEmailError,
      signupPseudoError,
      signupPasswordError,
      signupPasswordConfirmationError,
      signupError,
    } = state;

    return (
      <div>
        <div className="row">
          <div className="col-6">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="pseudoSign" className="mt-2">
              Pseudo
              <span id="pseudoSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="signupPseudo"
              value={state.signupPseudo}
              placeholder={t('placeHolderPseudo')}
              onChange={handleChange}
              type="name"
              className={signupPseudoError && signupPseudoError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {signupPseudoError}
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="emailSign" className="mt-2">
          {t('email')}
          <span id="emailSign" style={{ color: 'red' }}>*</span>
        </label>
        <FormControl
          name="signupEmail"
          value={state.signupEmail}
          placeholder={t('placeHolderEmail')}
          onChange={handleChange}
          type="email"
          className={signupEmailError && signupEmailError.length !== 0
            ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
          style={{ borderRadius: '20px 20px 20px 20px' }}
        />
        <div className="invalid-feedback">
          {signupEmailError}
        </div>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="passSign" className="mt-2">
          {t('password')}
          <span id="passSign" style={{ color: 'red' }}>*</span>
        </label>
        <FormControl
          name="signupPassword"
          value={state.signupPassword}
          placeholder={t('placeHolderPassword')}
          onChange={handleChange}
          type="password"
          className={signupPasswordError && signupPasswordError.length !== 0
            ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
          style={{ borderRadius: '20px 20px 20px 20px' }}
        />
        <div className="invalid-feedback">
          {signupPasswordError}
        </div>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="passconfSign" className="mt-2">
          {t('confPassword')}
          <span id="passconfSign" style={{ color: 'red' }}>*</span>
        </label>
        <FormControl
          name="signupPasswordConfirmation"
          value={state.signupPasswordConfirmation}
          placeholder={t('placeHolderPasswrdConfirm')}
          onChange={handleChange}
          type="password"
          className={signupPasswordConfirmationError && signupPasswordConfirmationError.length !== 0
            ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
          style={{ borderRadius: '20px 20px 20px 20px' }}
        />
        <div className="invalid-feedback">
          {signupPasswordConfirmationError}
        </div>

        <Button onClick={signupErr} className="btn btn-primary btn-user btn-block col-10 offset-1 mt-4" style={{ backgroundColor: '#254E70' }}>
          {signupLoading
            ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">{t('loadingWaiting')}</span>
              </Spinner>
            ) : t('iSignup') }
        </Button>
        <div className="invalid-feedback text-center">
          {signupError}
        </div>
      </div>
    );
  };

  // -------------------- SIGNUP END -------------------- //

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
                      {loginTextBox()}
                    </Tab>
                    <Tab eventKey="signup" title={t('signup')}>
                      {signupTextBox()}
                    </Tab>
                  </Tabs>
                </div>
              )}
              { matches.medium
              && (
                <div className="col-6 p-4" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                  <Tabs fill defaultActiveKey="login" id="uncontrolled-tab-example" style={{ marginTop: '70px' }}>
                    <Tab eventKey="login" title={t('login')} style={{ maxHeight: 'inherit' }}>
                      {loginTextBox()}
                    </Tab>
                    <Tab eventKey="signup" title={t('signup')}>
                      {signupTextBox()}
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
