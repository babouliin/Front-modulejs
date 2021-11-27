import React, { useState, useMemo } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import UserContext from './hooks/UserContext';
import {
  Login, Home, PageOne, PageTwo, Profile, NoMatch,
} from './pages';

import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (

    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Switch>
          <PublicRoute restricted component={Login} path="/" exact />
          <PrivateRoute component={Home} path="/home" exact />
          <PrivateRoute component={PageOne} path="/page-1" exact />
          <PrivateRoute component={PageTwo} path="/page-2" exact />
          <PrivateRoute component={Profile} path="/profile" exact />

          <PrivateRoute component={NoMatch} path="*" />

        </Switch>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;
