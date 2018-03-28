const Redux = require('Redux');

const todoApp = require('./todos');

const store = Redux.createStore(todoApp);
console.log('initial state');
console.log(store.getState());

console.log('dispatching ADD_TODO');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: "hello",
});
console.log('Current state: ');
console.log(store.getState());

console.log('Dispatching TOGGLE_TODO');

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});

console.log('Current state: ');
console.log(store.getState());

console.log('Dispatching VISIBILITY_FILTER');

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});

console.log('Current state: ');
console.log(store.getState());
