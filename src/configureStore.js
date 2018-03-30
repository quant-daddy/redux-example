import { loadState, saveState } from './localStorage';
const { createStore } = require('redux');
import throttle from 'lodash/throttle';
import todoApp from 'reducers';

const configureStore = () => {
  const persistentState = loadState();
  const store = createStore(todoApp, persistentState);

  store.subscribe(throttle(() => {
    const { todos } = store.getState();
    saveState({todos});
  }, 1000));

  return store;
};

export default configureStore;
