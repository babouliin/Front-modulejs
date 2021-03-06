import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { logout, isLogin } from '../middleware/auth';
import updateHeaders, { updateHeadersToken } from '../API/APIHeader';
import '../translations/i18n';

const Header = (props) => {
  const [state, setState] = useState(false);
  const { t } = useTranslation();
  const [cookies, setCookie] = useCookies(['user']);
  const [selectedOption, setSelectedOption] = useState({ value: cookies.Lang ? cookies.Lang.toLowerCase() : 'en', label: cookies.Lang ? cookies.Lang.toUpperCase() : 'EN' });
  const options = [
    { value: 'fr', label: 'FR' },
    { value: 'en', label: 'EN' },
  ];
  useEffect(() => setState(isLogin()), [props]);

  useEffect(() => {
    (function loadHeaderApi() {
      updateHeaders(cookies.Lang ? cookies.Lang.toLowerCase() : 'en');
      if (cookies.Token) {
        updateHeadersToken(cookies.Token);
      }
    }());
  }, [cookies]);

  const handleLogout = () => {
    logout(t('logoutSuccess'));
    setState(false);
  };

  const handleChange = (value) => {
    setSelectedOption(value);
    setCookie('Lang', value.value, { path: '/' });
    i18n.changeLanguage(value.value);
    updateHeaders(value.value);
  };

  return (
    <header>
      <Navbar>
        <Link className="navbar-brand" to="/home">{t('jsModule')}</Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Select
            defaultValue={selectedOption}
            onChange={handleChange}
            options={options}
          />
          <Navbar.Text className="p-3 ml-3">
            {state
              && (
                <Link to="./profile">
                  {t('profile')}
                </Link>
              )}
          </Navbar.Text>
          <Navbar.Text className="ml-3">
            {state
            && (
            <Link onClick={() => handleLogout()} to="/">
              {t('logout')}
            </Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
