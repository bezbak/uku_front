import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import reducers from './reducers';
import sagas from './sagas';

const isDev = process.env.NEXT_PUBLIC_NODE_TARGET === 'development';
const isBrowser = typeof window !== 'undefined';

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false, immutableCheck: false }),
    sagaMiddleware,
  ];

  if (isDev) {
    const logger = createLogger({
      level: 'info',
      duration: true,
      timestamp: true,
      collapsed: true,
    });

    middleware.push(logger);
  }

  const store = configureStore({
    reducer: reducers,
    middleware,
    preloadedState: context,
    devTools: true,
  });

  store.sagaTask = sagaMiddleware.run(sagas);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
