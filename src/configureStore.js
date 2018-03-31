import { loadState, saveState } from './localStorage';
const { createStore } = require('redux');
import throttle from 'lodash/throttle';
import todoApp from 'reducers';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    console.log("group doesn't exist");
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c new state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const configureStore = () => {
  const persistentState = loadState();
  const store = createStore(todoApp, persistentState);
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);    
  }
  store.subscribe(throttle(() => {
    const { todos } = store.getState();
    saveState({todos});
  }, 1000));

  return store;
};

export default configureStore;
