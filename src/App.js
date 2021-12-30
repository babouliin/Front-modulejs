import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './store';
import {
  Login, Home, Template, Profile, NoMatch,
} from './pages';
import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Provider store={store}>
          <Switch>
            <PublicRoute restricted component={Login} path="/" exact />
            <PrivateRoute component={Home} path="/home" exact />
            <PrivateRoute component={Profile} path="/profile" exact />
            <PrivateRoute component={Template} path="/template" exact />

            <PrivateRoute component={NoMatch} path="*" />

          </Switch>
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
