import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App, { Root } from './components/App';
import storage from './utils/storage';
import { configureClient } from './api/client';
import { configureStore } from './store';
import './index.css';

// Read token from storage
const { token } = storage.get('auth') || { token: null };

// Configure api client
configureClient(token);

// Create and configure a redux store
const history = createBrowserHistory();
const store = configureStore({ auth: token }, { history });

ReactDOM.render(
  <Root store={store} history={history}>
    <App />
  </Root>,
  document.getElementById('root'),
);
