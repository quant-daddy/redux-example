const { v4 } = require('uuid');
import { getIsFetching } from '../reducers';
import * as api from '../api';

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });
  return api.fetchTodos(filter).then(
    response => dispatch({
      type: 'FETCH_TODOS_SUCCESS',
      response,
      filter
    }),
    error => dispatch({
      type: 'FETCH_TODOS_FAILURE',
      filter,
      message: error.message || 'Something'
    })
  );
}
      
export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};
