import { createStore } from 'redux';
import reducer from './reducers/index.js';
export default function configureStore(initialState) {
  const store = createStore(reducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextReducer = require('./reducers/index');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
