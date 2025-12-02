import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HelmetProvider } from 'react-helmet-async';
import './polyfills';
import routes from './routes';
import storeFactory, { history } from './storeFactory';

const store = storeFactory();

const root = (
  <Provider store={store}>
    <HelmetProvider>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </HelmetProvider>
  </Provider>
);

const container = document.querySelector('#app-slot');

if (parseInt(process.env.WEBPACK_DEV_SERVER, 10)) {
  // No SSR
  render(root, container);
} else {
  // SSR enabled
  const cache = createCache({ key: 'custom' });
  hydrate(
    <CacheProvider value={cache}>
      { root }
    </CacheProvider>,
    container,
  );
}
