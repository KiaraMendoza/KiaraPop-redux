import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
// import { AuthContextProvider } from '../../contexts/auth';
import NotFoundPage from './NotFoundPage';

const App = () => {

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/adverts" />
      </Route>
      <Route path="/login" exact>
        {routerProps => (
          <LoginPage {...routerProps} />
        )}
      </Route>
      <PrivateRoute path="/adverts" exact>
        <AdvertsPage />
      </PrivateRoute>
      <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
      <PrivateRoute path="/adverts/:id" exact component={AdvertPage} />
      <Route path="/404" exact>
        {NotFoundPage}
      </Route>
      <Route>
        <Redirect to="/404" />
      </Route>
    </Switch>
  );
}

export default App;
