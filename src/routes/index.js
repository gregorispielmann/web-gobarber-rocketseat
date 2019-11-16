import React from 'react';

import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
// import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />

      <Route path="/" component={() => <h1>404</h1>}></Route>
    </Switch>
  );
}
