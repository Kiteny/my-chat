import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthorizationForm, RegistrationForm } from '../features/user';

const App = () => (
  <Router>
    <Switch>
      <Route path="/reg" component={RegistrationForm} />
      <Route path="/auth" component={AuthorizationForm} />
    </Switch>
  </Router>
);

export default App;
