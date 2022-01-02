import React, { useState, useEffect } from 'react';
import {
  Button, message,
} from 'antd';
import {
  FormControl, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../component/Layout';
import APIUser from '../API/APIUser';
import UserSelector from '../store/UserSelector';
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
  const user = useSelector(UserSelector);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    (async function loadUser() {
      const userReturn = await APIUser.getUser();
      if (userReturn) {
        const { data } = userReturn;
        if (userReturn.status === 200) {
          await dispatch(updateUser(data.data));
        } else {
          message.error(`${data.message}`);
        }
      } else {
        message.error(t('serverUnreachable'));
      }
    }());
  }, [dispatch, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const profileErr = async () => {
    let invalid = false;
    let pseudoError = '';
    let passwordError = '';
    let passwordConfError = '';
    const {
      profilePseudo, profilePassword, profilePasswordConfirmation,
    } = state;

    setState({ ...state, profileLoading: true });

    if (!profilePseudo || profilePseudo.length === 0) {
      pseudoError = t('errorWithoutPseudo');
      invalid = true;
    } else if (profilePseudo.length < 4) {
      pseudoError = t('errorPseudoNotValid');
      invalid = true;
    } else {
      pseudoError = '';
    }

    if (!profilePassword || profilePassword.length === 0) {
      passwordError = t('errorWithoutPassword');
      invalid = true;
    } else if (profilePassword.length < 8 || !/\d/.test(profilePassword) || !/[a-zA-Z]/.test(profilePassword)) {
      passwordError = t('errorPasswordNotValid');
      invalid = true;
    } else {
      passwordError = '';
    }

    if (profilePassword !== profilePasswordConfirmation) {
      passwordConfError = t('errorDifferentPassword');
      invalid = true;
    } else {
      passwordConfError = '';
    }

    if (invalid) {
      setState({
        ...state,
        profilePseudoError: pseudoError,
        profilePasswordError: passwordError,
        profilePasswordConfirmationError: passwordConfError,
        profileLoading: false,
      });
      return;
    }

    const userReturn = await APIUser.updateUser(profilePseudo, profilePassword);
    if (userReturn) {
      const { data } = userReturn;
      if (userReturn.status === 201) {
        await dispatch(updateUser(data.data));
        message.success(t('updateSuccess'));
      } else {
        message.error(`${t('updateFailed')} ${data.message}`);
      }
      setEdit(false);
      setState({ ...state, profileLoading: false, profileError: '' });
    } else {
      message.error(t('serverUnreachable'));
    }
  };

  const profileTextBoxEdit = () => {
    const {
      profilePseudo, profilePassword, profilePasswordConfirmation, profileLoading,
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
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="emailSign" className="mt-2">
              {t('email')}
              <span id="emailSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              disabled
              name="profileEmail"
              value={user.email}
              placeholder={t('placeHolderEmail')}
              type="email"
              className={profileEmailError && profileEmailError.length !== 0
                ? 'form-control form-control-user is-invalid' : 'form-control form-control-user'}
              style={{ borderRadius: '20px 20px 20px 20px' }}
            />
            <div className="invalid-feedback">
              {profileEmailError}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="pseudoSign" className="mt-2">
              {t('username')}
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
            <label htmlFor="passSign" className="mt-2">
              {t('newPassword')}
              <span id="passSign" style={{ color: 'red' }}>*</span>
            </label>
            <FormControl
              name="profilePassword"
              value={profilePassword}
              placeholder={t('placeHolderNewPassword')}
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
      profileLoading,
    } = state;

    return (
      <div className="card-body">
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <h6 className="mb-2 text-primary">{t('personalDetails')}</h6>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="emailSign" className="mt-2">
              {t('email')}
              <span id="emailSign" style={{ color: 'red' }}>*</span>
            </label>
            <p>{user.email}</p>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="pseudoSign" className="mt-2">
              {t('username')}
              <span id="pseudoSign" style={{ color: 'red' }}>*</span>
            </label>
            <p>{user.pseudo}</p>
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
    <Layout className="" isHeader>
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
                    <h5 className="user-name">{user.pseudo}</h5>
                    <h6 className="user-email">{user.email}</h6>
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
