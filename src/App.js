import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './store';
import {
  Login, Home, PageOne, PageTwo, Profile, NoMatch,
} from './pages';
import UserDiscussionsListStore from './component/UserDiscussionsList';
import ChannelMessageStore from './component/ChannelMessage';
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
            <PrivateRoute component={UserDiscussionsListStore} path="/home2" exact />
            <PrivateRoute component={ChannelMessageStore} path="/home3" exact />
            <PrivateRoute component={PageOne} path="/page-1" exact />
            <PrivateRoute component={PageTwo} path="/page-2" exact />
            <PrivateRoute component={Profile} path="/profile" exact />

            <PrivateRoute component={NoMatch} path="*" />

          </Switch>
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
