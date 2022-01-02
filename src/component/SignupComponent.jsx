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
import { signup } from '../middleware/auth';
import APIAuth from '../API/APIAuth';
import { updateHeadersToken } from '../API/APIHeader';

const SignupComponent = (props) => {
  const [state, setState] = useState({
    signupEmail: '',
    signupPseudo: '',
    signupPassword: '',
    signupPasswordConfirmation: '',
    signupLoading: false,

    signupEmailError: '',
    signupPseudoError: '',
    signupPasswordError: '',
    signupPasswordConfirmError: '',
    signupError: '',

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

  const signupErr = async () => {
    let invalid = false;
    let errorPseudo = '';
    let errorEmail = '';
    let errorPassword = '';
    let errorPasswordConf = '';
    const {
      signupEmail, signupPseudo, signupPassword, signupPasswordConfirmation,
    } = state;

    setState({ ...state, signupLoading: true });

    if (!signupEmail || signupEmail.length === 0) {
      errorEmail = t('errorWithoutEmail');
      invalid = true;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signupEmail)) {
      errorEmail = t('errorEmailNotValid');
      invalid = true;
    } else {
      errorEmail = '';
    }

    if (!signupPseudo || signupPseudo.length === 0) {
      errorPseudo = t('errorWithoutPseudo');
      invalid = true;
    } else if (signupPseudo.length < 4) {
      errorPseudo = t('errorPseudoNotValid');
      invalid = true;
    } else {
      errorPseudo = '';
    }

    if (!signupPassword || signupPassword.length === 0) {
      errorPassword = t('errorWithoutPassword');
      invalid = true;
    } else if (signupPassword.length < 8 || !/\d/.test(signupPassword) || !/[a-zA-Z]/.test(signupPassword)) {
      errorPassword = t('errorPasswordNotValid');
      invalid = true;
    } else {
      errorPassword = '';
    }

    if (signupPassword !== signupPasswordConfirmation) {
      errorPasswordConf = t('errorDifferentPassword');
      invalid = true;
    } else {
      errorPasswordConf = '';
    }

    if (invalid) {
      setState({
        ...state,
        signupEmailError: errorEmail,
        signupPseudoError: errorPseudo,
        signupPasswordError: errorPassword,
        signupPasswordConfirmError: errorPasswordConf,
        signupLoading: false,
      });
      return;
    }

    const signupReturn = await APIAuth.signup(signupEmail, signupPassword, signupPseudo);
    if (signupReturn) {
      const { data } = signupReturn;
      if (signupReturn.status === 201) {
        setCookie('Token', data.token, { path: '/' });
        updateHeadersToken(data.token);
        localStorage.setItem('token', data.token);
        setState({ ...state, signupLoading: false, signupError: '' });
        signup(props, t('signUpSuccess'));
      } else {
        message.error(`${t('signUpFailed')} ${data.message}`);
        setState({ ...state, signupLoading: false, signupError: '' });
      }
    } else {
      message.error(t('serverUnreachable'));
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-6">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
          <label htmlFor="pseudoSign" className="mt-2">
            {t('username')}
            <span id="pseudoSign" style={{ color: 'red' }}>*</span>
          </label>
          <FormControl
            name="signupPseudo"
            value={state.signupPseudo}
            placeholder={t('placeHolderPseudo')}
            onChange={handleChange}
            type="name"
            className={state.signupPseudoError && state.signupPseudoError.length !== 0
              ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
            style={{ borderRadius: '20px 20px 20px 20px' }}
          />
          <div className="invalid-feedback">
            {state.signupPseudoError}
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
        className={state.signupEmailError && state.signupEmailError.length !== 0
          ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
        style={{ borderRadius: '20px 20px 20px 20px' }}
      />
      <div className="invalid-feedback">
        {state.signupEmailError}
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
        className={state.signupPasswordError && state.signupPasswordError.length !== 0
          ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
        style={{ borderRadius: '20px 20px 20px 20px' }}
      />
      <div className="invalid-feedback">
        {state.signupPasswordError}
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
        className={
          state.signupPasswordConfirmError && state.signupPasswordConfirmError.length !== 0
            ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'
        }
        style={{ borderRadius: '20px 20px 20px 20px' }}
      />
      <div className="invalid-feedback">
        {state.signupPasswordConfirmError}
      </div>

      <Button onClick={signupErr} className="btn btn-primary btn-user btn-block col-10 offset-1 mt-4" style={{ backgroundColor: '#254E70' }}>
        {state.signupLoading
          ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">{t('loadingWaiting')}</span>
            </Spinner>
          ) : t('iSignup') }
      </Button>
      <div className="invalid-feedback text-center">
        {state.signupError}
      </div>
    </div>
  );
};

export default withRouter(SignupComponent);
