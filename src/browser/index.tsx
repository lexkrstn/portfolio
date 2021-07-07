import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import './polyfills';
import routes from './routes';
import storeFactory, { history } from './storeFactory';

const store = storeFactory();

const root = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>
);

hydrate(root, document.querySelector('#app-slot'));
