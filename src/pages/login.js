/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import {
  FormControl, Tabs, Tab, Spinner,
} from 'react-bootstrap';
import Media from 'react-media';
import Roules from '../util/rules';
import { login, signup } from '../middleware/auth';
import Layout from '../component/layout';

const Login = (props) => {
  const [state, setState] = useState({

    loginEmail: '',
    loginPassword: '',
    loginError: '',
    loginStayLog: false,
    loginLoading: false,

    // signup

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
    // END signup

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginErr = () => {
    let invalid = false;
    let error = '';
    const { loginEmail, loginPassword } = state;
    setState({ ...state, loginLoading: true });

    console.log('login');
    console.log(loginEmail);
    console.log(loginPassword);

    if (!loginEmail || loginEmail.length === 0) {
      error = "L'adresse e-mail est requise";
      invalid = true;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(loginEmail)) {
      error = 'Les identifiants de connection ne sont pas valides';
      invalid = true;
    } else if (!loginPassword || loginPassword.length === 0) {
      error = 'Le mot de passe est requis';
      invalid = true;
    } else if (loginPassword.length < 8 || !/\d/.test(loginPassword) || !/[a-zA-Z]/.test(loginPassword)) {
      error = 'Les identifiants de connection ne sont pas valides';
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
    login(props);
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
          <label htmlFor="emailLogin" className="mt-2">
            Adresse e-mail
            <span id="emailLogin" style={{ color: 'red' }}>*</span>
          </label>
          <FormControl
            name="loginEmail"
            value={state.loginEmail}
            placeholder="Entrez votre adresse e-mail"
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

          <label htmlFor="passLogin" className="mt-2">
            Mot de passe
            <span id="passLogin" style={{ color: 'red' }}>*</span>
          </label>
          <FormControl
            name="loginPassword"
            value={state.loginPassword}
            placeholder="Entrez votre mot de passe"
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
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : 'Je me connecte'}
        </Button>
      </div>
    );
  };

  // -------------------- LOGIN END -------------------- //

  // -------------------- SIGNUP -------------------- //

  const signupErr = () => {
    let invalid = false;
    setState({ ...state, signupLoading: true });
    const {
      signupEmail, signupPseudo, signupPassword, signupPasswordConfirmation,
    } = state;

    console.log('signup');
    console.log(signupEmail);
    console.log(signupPseudo);
    console.log(signupPassword);
    console.log(signupPasswordConfirmation);

    if (!signupEmail || signupEmail.length === 0) {
      setState({ ...state, signupEmailError: 'L\'adresse e-mail est requise' });
      invalid = true;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signupEmail)) {
      setState({ ...state, signupEmailError: 'L\'adresse e-mail n\'est pas valide : nom@dommaine.com' });
      invalid = true;
    } else {
      setState({ ...state, signupEmailError: '' });
    }

    if (!signupPseudo || signupPseudo.length === 0) {
      setState({ ...state, signupPseudoError: 'Le pseudo est requis' });
      invalid = true;
    } else if (signupPseudo.length < 4) {
      setState({ ...state, signupPseudoError: 'Le pseudo doit faire plus de 4 charactères' });
      invalid = true;
    } else {
      setState({ ...state, signupPseudoError: '' });
    }

    if (!signupPassword || signupPassword.length === 0) {
      setState({ ...state, signupPasswordError: 'Un mot de passe est requis' });
      invalid = true;
    } else if (signupPassword.length < 8 || !/\d/.test(signupPassword) || !/[a-zA-Z]/.test(signupPassword)) {
      setState({ ...state, signupPasswordError: 'Le mot de passe doit contenir au minimum 8 caractères dont une lettre et un chiffre' });
      invalid = true;
    } else {
      setState({ ...state, signupPasswordError: '' });
    }

    if (signupPassword !== signupPasswordConfirmation) {
      setState({ ...state, signupPasswordConfirmationError: 'Les mots de passes ne correspondent pas' });
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
    signup(props);
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
            <label htmlFor="pseudoSign" className="mt-2">
              Pseudo
              <span id="pseudoSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="signupPseudo"
              value={state.signupPseudo}
              placeholder="Entrez votre pseudo"
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

        <label htmlFor="emailSign" className="mt-2">
          Adresse e-mail
          <span id="emailSign" style={{ color: 'red' }}>*</span>
        </label>
        <FormControl
          name="signupEmail"
          value={state.signupEmail}
          placeholder="Entrez votre adresse e-mail"
          onChange={handleChange}
          type="email"
          className={signupEmailError && signupEmailError.length !== 0
            ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
          style={{ borderRadius: '20px 20px 20px 20px' }}
        />
        <div className="invalid-feedback">
          {signupEmailError}
        </div>

        <label htmlFor="passSign" className="mt-2">
          Mot de passe
          <span id="passSign" style={{ color: 'red' }}>*</span>
        </label>
        <FormControl
          name="signupPassword"
          value={state.signupPassword}
          placeholder="Entrez votre mot de passe"
          onChange={handleChange}
          type="password"
          className={signupPasswordError && signupPasswordError.length !== 0
            ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
          style={{ borderRadius: '20px 20px 20px 20px' }}
        />
        <div className="invalid-feedback">
          {signupPasswordError}
        </div>

        <label htmlFor="passconfSign" className="mt-2">
          Confirmation du mot de passe
          <span id="passconfSign" style={{ color: 'red' }}>*</span>
        </label>
        <FormControl
          name="signupPasswordConfirmation"
          value={state.signupPasswordConfirmation}
          placeholder="Confirmez votre mot de passe"
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
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : 'Je m inscrit' }
        </Button>
        <div className="invalid-feedback text-center">
          {signupError}
        </div>
      </div>
    );
  };

  // -------------------- SIGNUP END -------------------- //

  // // LOGIN SUCCESS
  // const onFinish = (values) => {
  //   console.log('Success: ', values);
  //   login(props, values);
  // };

  // // LOGIN FAILED
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

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
                    <Tab eventKey="login" title="Se connecter">
                      {loginTextBox()}
                    </Tab>
                    <Tab eventKey="signup" title="S'inscrire">
                      {signupTextBox()}
                    </Tab>
                  </Tabs>
                </div>
              )}
              { matches.medium
              && (
                <div className="col-6 p-4" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                  <Tabs fill defaultActiveKey="login" id="uncontrolled-tab-example" style={{ marginTop: '70px' }}>
                    <Tab eventKey="login" title="Se connecter" style={{ maxHeight: 'inherit' }}>
                      {loginTextBox()}
                    </Tab>
                    <Tab eventKey="signup" title="S'inscrire">
                      {signupTextBox()}
                    </Tab>
                  </Tabs>
                </div>
              )}
            </>
          )}
        </Media>
      </div>
      {/* <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="username"
          type="text"
          rules={Roules.text}
        >
          <Input placeholder="Username" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          type="password"
          rules={Roules.password}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form> */}
    </Layout>

  );
};

export default Login;
