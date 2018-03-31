import todos, * as fromTodos from './todos';
const { combineReducers } = require('redux');

const todoApp = combineReducers({
  todos,
});
export default todoApp;

const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter);

export { getVisibleTodos };
