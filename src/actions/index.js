const { v4 } = require('uuid');

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),
    text,
  }
};

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export {
  addTodo, toggleTodo, setVisibilityFilter
}
