const { createStore, applyMiddleware } = require('redux');
import promise from 'redux-promise';
import logger from 'redux-logger';
import todoApp from 'reducers';

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(mw => {
//     store.dispatch = mw(store)(store.dispatch);
//   })
// }

// const promise = (store) => (next) => (action) => {
//   if (typeof action.then === 'function') {
//     return action.then(next);
//   } else {
//     return next(action);
//   }
// }
//
// const logger = (store) => (next) => (action) => {
//   if (!console.group) {
//     console.log("group doesn't exist");
//     return next(action);
//   }
//   console.group(action.type);
//   console.log('%c prev state', 'color: gray', store.getState());
//   console.log('%c action', 'color: blue', action);
//   const returnValue = next(action);
//   console.log('%c new state', 'color: green', store.getState());
//   console.groupEnd(action.type);
//   return returnValue;
// };

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  return createStore(todoApp, applyMiddleware(...middlewares))
};

export default configureStore;
