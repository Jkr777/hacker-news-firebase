import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { firebase } from "./firebase";
import FirebaseContext from './context';
import Header from './components/header';
import Login from './pages/login';
import useAuth from './costumHook/useAuth';
import Reset from "./pages/reset";
import CreateLink from "./pages/createLink";
import Links from "./pages/links";
import Search from "./pages/search";
import Link from "./pages/link";

// test
import Test from './prev';

const App = () => {
  const user = useAuth(); 
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}> 
        <Header />
        <Switch>
          <Route path="/" render={() => <Redirect to="/links/1" />} exact />
          <Route path="/links/:page" component={Links} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/reset" component={Reset} exact />
          <Route path="/create" component={CreateLink} exact />
          <Route path="/link/:id" component={Link} exact />
          <Route path="/search" component={Search} exact />
          <Route path="/top" component={Links} exact />
          {/* <Route path="/prev" component={Test} exact /> */}
          <Redirect to="/links/1" />
        </Switch>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
};

export default App;