const { combineReducers } = require('redux');

const createList = (filter) => {

  const ids = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return action.filter === filter ? action.response.result : state;
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ? [...state, action.response.result] : state;
      case 'TOGGLE_TODO_SUCCESS':
        const toggledId = action.response.result;
        const { completed } = action.response.entities.todos[toggledId];
        const shouldRemove = (
          (filter==='completed' && !completed) ||
          (filter==='pending' && completed)
        );
        return shouldRemove ? state.filter(id => id !== toggledId) : state;
      default:
        return state;
    }
  }

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return false;
    }
  };

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_REQUEST':
        return null;
      default:
        return state;
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};

export default createList;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetching;

export const getErrorMessage = (state) => state.errorMessage;
