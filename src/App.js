import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header';
import Login from './pages/login';
import useAuth from './costumHook/useAuth';
// test
import Auth from './prev/auth';

const App = () => {
  const user = useAuth(); // invoc fn hook
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Auth} exact />
        <Route path="/prevLogin" component={Auth} exact />
        <Route path="/login" component={Login} exact />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;