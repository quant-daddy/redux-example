const { combineReducers } = require('redux');

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case 'TOGGLE_TODO':
      if (state.id === action.id) {
        return {...state, completed: !state.completed};
      }
      return state;
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      const newTodo = state.filter(todo => action.id===todo.id);
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibility: visibilityFilter(state.visibility, action),
//   }
// }
const _combineReducers = (reducers) => {
  return (state = {}, action) => {
    let result = {};
    for (const [key, value] of Object.entries(reducers)) {
      result[key] = value(state[key], action);
    }
    return result;
  }
};

const __combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = Object.keys(reducers).reduce(
      (nextState, key) =>  {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}
    );
    return newState;
  }
};

const todoApp = __combineReducers({
  todos,
  visibilityFilter
});

module.exports = todoApp;
