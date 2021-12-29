import React, { useState } from 'react';
import {
  Button, message,
} from 'antd';
import {
  FormControl, Spinner,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import socket from '../socket';
import { login } from '../middleware/auth';
import APIAuth from '../API/APIAuth';
import { updateHeadersToken } from '../API/APIHeader';

const LoginComponent = (props) => {
  const [state, setState] = useState({

    loginEmail: '',
    loginPassword: '',
    loginError: '',
    loginStayLog: false,
    loginLoading: false,
  });
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
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
      socket.query = { token: `${data.token}` };
      socket.connect();
      login(props);
    } else {
      message.error(`Login Failed ${data.message}`);
    }
  };

  const handleLoginInput = (target) => {
    if (target.key === 'Enter') loginErr();
  };

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
          className={state.loginError && state.loginError.length !== 0
            ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
          style={{ borderRadius: '20px 20px 20px 20px' }}
          onKeyPress={handleLoginInput}
        />
        <div className="invalid-feedback">
          {state.loginError}
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
        {state.loginLoading
          ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">{t('loadingWaiting')}</span>
            </Spinner>
          ) : t('iLogin')}
      </Button>
    </div>
  );
};

export default withRouter(LoginComponent);
