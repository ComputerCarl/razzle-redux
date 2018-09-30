import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// https://codeburst.io/react-redux-example-paginated-api-7303d9545016
const middlewares = [thunk];
const enhancer = compose(
  applyMiddleware(...middlewares),
  (typeof window !== 'undefined') && window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
