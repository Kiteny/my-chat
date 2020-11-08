import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';

import { AuthorizationForm, RegistrationForm, userSelectors } from '../features/user';
import { RoomsList } from '../features/rooms';
import { Chat } from '../features/chat';

import './App.scss';

const { selectUserLoggedIn } = userSelectors;

const App = () => {
  const isLoggedIn = useSelector(selectUserLoggedIn);

  return (
    <Router>
      <Switch>
        <Route path="/reg" component={RegistrationForm} exact />
        <Route path="/auth" component={AuthorizationForm} exact />

        {isLoggedIn && <Route path="/rooms/:chatId" component={Chat} />}
        {isLoggedIn && <Route path="/rooms" component={RoomsList} />}

        {isLoggedIn && <Redirect to="/rooms" />}
        <Redirect to="/auth" />
      </Switch>
    </Router>
  );
};

export default App;
