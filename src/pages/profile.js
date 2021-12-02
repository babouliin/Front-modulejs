/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import {
  FormControl, Tabs, Tab, Spinner,
} from 'react-bootstrap';
import Layout from '../component/layout';
import '../assets/scss/pages/_profile.css';

const Profile = () => {
  const [state, setState] = useState({

    profilEmail: '',
    profilPseudo: '',
    profilPassword: '',
    profilPasswordConfirmation: '',
    profilLoading: false,

    profilEmailError: '',
    profilPseudoError: '',
    profilPasswordError: '',
    profilPasswordConfirmationError: '',
    profilError: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const profilErr = () => {
    let invalid = false;
    setState({ ...state, prfilLoading: true });
    const {
      profilEmail, profilPseudo, profilPassword, profilPasswordConfirmation,
    } = state;

    console.log('profil');
    console.log(profilEmail);
    console.log(profilPseudo);
    console.log(profilPassword);
    console.log(profilPasswordConfirmation);

    if (!profilEmail || profilEmail.length === 0) {
      setState({ ...state, profilEmailError: 'L\'adresse e-mail est requise' });
      invalid = true;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(profilEmail)) {
      setState({ ...state, profilEmailError: 'L\'adresse e-mail n\'est pas valide : nom@dommaine.com' });
      invalid = true;
    } else {
      setState({ ...state, profilEmailError: '' });
    }

    if (!profilPseudo || profilPseudo.length === 0) {
      setState({ ...state, profilPseudoError: 'Le pseudo est requis' });
      invalid = true;
    } else if (profilPseudo.length < 4) {
      setState({ ...state, profilPseudoError: 'Le pseudo doit faire plus de 4 charactères' });
      invalid = true;
    } else {
      setState({ ...state, profilPseudoError: '' });
    }

    if (!profilPassword || profilPassword.length === 0) {
      setState({ ...state, profilPasswordError: 'Un mot de passe est requis' });
      invalid = true;
    } else if (profilPassword.length < 8 || !/\d/.test(profilPassword) || !/[a-zA-Z]/.test(profilPassword)) {
      setState({ ...state, profilPasswordError: 'Le mot de passe doit contenir au minimum 8 caractères dont une lettre et un chiffre' });
      invalid = true;
    } else {
      setState({ ...state, profilPasswordError: '' });
    }

    if (profilPassword !== profilPasswordConfirmation) {
      setState({ ...state, profilPasswordConfirmationError: 'Les mots de passes ne correspondent pas' });
      invalid = true;
    } else {
      setState({ ...state, profilPasswordConfirmationError: '' });
    }

    if (invalid) {
      setState({ ...state, profilLoading: false });
      return;
    }

    localStorage.setItem('email', profilEmail);
    setState({ ...state, profilLoading: false, profilError: '' });
    console.log('OK');
    // profil(props);
  };

  const profilTextBox = () => {
    const {
      profilEmail, profilPseudo, profilPassword, profilPasswordConfirmation, profilLoading,
    } = state;
    const {
      profilEmailError,
      profilPseudoError,
      profilPasswordError,
      profilPasswordConfirmationError,
      profilError,
    } = state;

    return (
      <div className="card-body">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 className="mb-2 text-primary">Personal Details</h6>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <label htmlFor="pseudoSign" className="mt-2">
              Pseudo
              <span id="pseudoSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilPseudo"
              value={state.profilPseudo}
              placeholder="Entrez votre pseudo"
              onChange={handleChange}
              type="email"
              className={profilPseudoError && profilPseudoError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <label htmlFor="emailSign" className="mt-2">
              Adresse e-mail
              <span id="emailSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilEmail"
              value={state.profilEmail}
              placeholder="Entrez votre adresse e-mail"
              onChange={handleChange}
              type="email"
              className={profilEmailError && profilEmailError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {profilEmailError}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <label htmlFor="passSign" className="mt-2">
              Mot de passe
              <span id="passSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilPassword"
              value={state.profilPassword}
              placeholder="Entrez votre mot de passe"
              onChange={handleChange}
              type="password"
              className={profilPasswordError && profilPasswordError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {profilPasswordError}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <label htmlFor="passconfSign" className="mt-2">
              Confirmation du mot de passe
              <span id="passconfSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilPasswordConfirmation"
              value={state.profilPasswordConfirmation}
              placeholder="Confirmez votre mot de passe"
              onChange={handleChange}
              type="password"
              className={profilPasswordConfirmationError
                && profilPasswordConfirmationError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {profilPasswordConfirmationError}
            </div>
          </div>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
            <div className="text-right">
              <button type="button" id="submit" name="submit" className="btn btn-secondary">Cancel</button>
              <Button onClick={profilErr} type="button" id="submit" name="submit" className="btn btn-primary" style={{ backgroundColor: '#254E70' }}>
                {profilLoading
                  ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : 'Update' }
              </Button>
              <div className="invalid-feedback text-center">
                {profilError}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout className="app-camearadetails" isHeader>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                    </div>
                    <h5 className="user-name">Yuki Hayashi</h5>
                    <h6 className="user-email">yuki@Maxwell.com</h6>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                    <p>I&apos;m Yuki. Full Stack Designer I enjoy creating user-centric,</p>
                    <p> delightful and human experiences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card">
              {profilTextBox()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
