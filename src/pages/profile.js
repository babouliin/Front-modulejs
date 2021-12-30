import React, { useState } from 'react';
import {
  Button, message,
} from 'antd';
import {
  FormControl, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Layout from '../component/Layout';
import APIUser from '../API/APIUser';
import updateUser from '../store/UserAction';
import '../assets/scss/pages/_profile.css';

const Profile = () => {
  const [state, setState] = useState({
    profileEmail: '',
    profilePseudo: '',
    profilePassword: '',
    profilePasswordConfirmation: '',
    profileLoading: false,

    profileEmailError: '',
    profilePseudoError: '',
    profilePasswordError: '',
    profilePasswordConfirmationError: '',
    profileError: '',

  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  console.log(`isEdit ${isEdit}`);

  const loadUser = (async () => {
    const userReturn = await APIUser.getUser();
    const { data } = userReturn;
    if (userReturn.status === 200) {
      console.log(data.data);
      await dispatch(updateUser(data.data));
    } else {
      message.error(`Error ${data.message}`);
    }
  });
  loadUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const profileErr = async () => {
    let invalid = false;
    setState({ ...state, profileLoading: true });
    const {
      profileEmail, profilePseudo, profilePassword, profilePasswordConfirmation,
    } = state;

    if (!profileEmail || profileEmail.length === 0) {
      setState({ ...state, profileEmailError: t('errorWithoutEmail') });
      invalid = true;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(profileEmail)) {
      setState({ ...state, profileEmailError: t('errorEmailNotValid') });
      invalid = true;
    } else {
      setState({ ...state, profileEmailError: '' });
    }

    if (!profilePseudo || profilePseudo.length === 0) {
      setState({ ...state, profilePseudoError: t('errorWithoutPseudo') });
      invalid = true;
    } else if (profilePseudo.length < 4) {
      setState({ ...state, profilePseudoError: t('errorPseudoNotValid') });
      invalid = true;
    } else {
      setState({ ...state, profilePseudoError: '' });
    }

    if (!profilePassword || profilePassword.length === 0) {
      setState({ ...state, profilePasswordError: t('errorWithoutPassword') });
      invalid = true;
    } else if (profilePassword.length < 8 || !/\d/.test(profilePassword) || !/[a-zA-Z]/.test(profilePassword)) {
      setState({ ...state, profilePasswordError: t('errorPasswordNotValid') });
      invalid = true;
    } else {
      setState({ ...state, profilePasswordError: '' });
    }

    if (profilePassword !== profilePasswordConfirmation) {
      setState({ ...state, profilePasswordConfirmationError: t('errorDifferentPassword') });
      invalid = true;
    } else {
      setState({ ...state, profilePasswordConfirmationError: '' });
    }

    if (invalid) {
      setState({ ...state, profileLoading: false });
      return;
    }

    console.log('OK');

    const userReturn = await APIUser.updateUser(profilePseudo, profilePassword);
    const { data } = userReturn;
    if (userReturn.status === 200) {
      await dispatch(updateUser(data.data));
      message.success('Update Success');
    } else {
      message.error(`Update Failed ${data.message}`);
    }
    setEdit(false);
    setState({ ...state, profileLoading: false, profileError: '' });
  };

  const profileTextBoxEdit = () => {
    const {
      profileEmail, profilePseudo, profilePassword, profilePasswordConfirmation, profileLoading,
    } = state;
    const {
      profileEmailError,
      profilePseudoError,
      profilePasswordError,
      profilePasswordConfirmationError,
      profileError,
    } = state;

    return (
      <div className="card-body">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 className="mb-2 text-primary">{t('personalDetails')}</h6>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="pseudoSign" className="mt-2">
              Pseudo
              <span id="pseudoSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilePseudo"
              value={profilePseudo}
              placeholder={t('placeHolderPseudo')}
              onChange={handleChange}
              type="email"
              className={profilePseudoError && profilePseudoError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="emailSign" className="mt-2">
              {t('email')}
              <span id="emailSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profileEmail"
              value={profileEmail}
              placeholder={t('placeHolderEmail')}
              onChange={handleChange}
              type="email"
              className={profileEmailError && profileEmailError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {profileEmailError}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="passSign" className="mt-2">
              {t('password')}
              <span id="passSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilePassword"
              value={profilePassword}
              placeholder={t('placeHolderPassword')}
              onChange={handleChange}
              type="password"
              className={profilePasswordError && profilePasswordError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {profilePasswordError}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="passconfSign" className="mt-2">
              {t('confPassword')}
              <span id="passconfSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilePasswordConfirmation"
              value={profilePasswordConfirmation}
              placeholder={t('placeHolderPasswrdConfirm')}
              onChange={handleChange}
              type="password"
              className={profilePasswordConfirmationError
                && profilePasswordConfirmationError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {profilePasswordConfirmationError}
            </div>
          </div>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
            <div className="text-right">
              <Button onClick={() => setEdit(false)} type="button" id="submit" name="submit" className="btn btn-secondary">{t('cancel')}</Button>
              <Button onClick={profileErr} type="button" id="submit" name="submit" className="btn btn-primary" style={{ backgroundColor: '#254E70' }}>
                {profileLoading
                  ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">{t('loadingWaiting')}</span>
                    </Spinner>
                  ) : t('update') }
              </Button>
              <div className="invalid-feedback text-center">
                {profileError}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const profileTextBox = () => {
    const {
      profileEmail, profilePseudo, profileLoading,
    } = state;

    return (
      <div className="card-body">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 className="mb-2 text-primary">{t('personalDetails')}</h6>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="pseudoSign" className="mt-2">
              Pseudo
              <span id="pseudoSign" style={{ color: 'red' }}>*</span>
            </label>
            <p>{profilePseudo}</p>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="emailSign" className="mt-2">
              {t('email')}
              <span id="emailSign" style={{ color: 'red' }}>*</span>
            </label>
            <p>{profileEmail}</p>
          </div>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
            <div className="text-right">
              <Button onClick={() => setEdit(true)} type="button" id="submit" name="submit" className="btn btn-primary" style={{ backgroundColor: '#254E70' }}>
                {profileLoading
                  ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">{t('loadingWaiting')}</span>
                    </Spinner>
                  ) : t('update') }
              </Button>
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
                    <h5>{t('about')}</h5>
                    <p>I&apos;m Yuki. Full Stack Designer I enjoy creating user-centric,</p>
                    <p> delightful and human experiences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card">
              {isEdit ? profileTextBoxEdit() : profileTextBox()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
