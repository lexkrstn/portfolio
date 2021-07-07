import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

// These two are excluded from the production code via replacing by noop-loader of webpack
import { composeWithDevTools as composeWithDevToolsExtension } from 'redux-devtools-extension';
// import { composeWithDevTools as composeWithRemoteDevTools } from 'remote-redux-devtools';

import epic from './rootEpic';
import createRootReducer, { RootState } from './rootReducer';

declare const __INITIAL_STATE__: RootState;
type StoreEnhancer = typeof composeWithDevToolsExtension;

export const history = typeof window !== 'undefined'
  ? createBrowserHistory()
  : createMemoryHistory();

/**
 * Isomorphic redux store factory
 */
export default function storeFactory(): Store<RootState> {
  let preloadedState: RootState;
  let composeWithDevTools: StoreEnhancer;

  // Rehydrate the store with server-side generated data
  if (typeof window !== 'undefined' && __INITIAL_STATE__) {
    // Grab the state from a global variable injected into the server-generated HTML
    preloadedState = __INITIAL_STATE__;

    // Use browser extension version of redux dev tools
    composeWithDevTools = process.env.NODE_ENV === 'production' ?
      compose : composeWithDevToolsExtension;
  } else {
    // Use remote version of redux dev tools
    // composeWithDevTools = process.env.NODE_ENV === 'production' ?
    //   compose : composeWithRemoteDevTools;
    composeWithDevTools = compose;
  }

  // Create side-effects middleware
  const epicMiddleware = createEpicMiddleware();

  // Create Redux store with initial state
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(
      epicMiddleware,
      routerMiddleware(history),
    )),
  );

  epicMiddleware.run(epic);

  return store;
}
