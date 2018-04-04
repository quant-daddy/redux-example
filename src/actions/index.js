import { normalize } from 'normalizr';
import * as schema from './schema';
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
    response => {
      console.log('normalized response', normalize(response, schema.todos));
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        response: normalize(response, schema.todos),
        filter
      });
    },
    error => dispatch({
      type: 'FETCH_TODOS_FAILURE',
      filter,
      message: error.message || 'Something'
    })
  );
}

export const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then(
    (response) => {
      console.log('normalized response', normalize(response, schema.todo));
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        response: normalize(response, schema.todo)
      })
    },
    (error) => {
      console.log('add todo failed');
    }
  )
}

export const toggleTodo = (id) => (dispatch) => {
  api.toggleTodo(id).then(res => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(res, schema.todo),
    });
  })

};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};
