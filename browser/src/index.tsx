import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hydrate, render } from 'react-dom';
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

const container = document.querySelector('#app-slot');

if (typeof process.env.WEBPACK_DEV_SERVER !== 'undefined') {
  render(root, container); // No SSR
} else {
  hydrate(root, container); // SSR enabled
}
