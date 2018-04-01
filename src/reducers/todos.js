const { combineReducers } = require('redux');

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      let nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  };
};

// const allId = (state=[], action) => {
//   switch(action.type) {
//     case 'ADD_TODO':
//       return [...state, action.id];
//     default:
//       return state;
//   }
// };

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'RECEIVE_TODOS':
      if (action.filter !== 'all') {
        return state;
      }
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
}

const activeIds = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      if (action.filter !== 'active') {
        return state;
      }
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
}

const completedIds = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      if (action.filter !== 'completed') {
        return state;
      }
      return [...state, action.response.map(todo => todo.id)];
    default:
      return state;
  }
}


const idsByFilter = combineReducers({
  all: allIds,
  pending: activeIds,
  completed: completedIds
})

const todos = combineReducers({
  byId,
  idsByFilter
});
// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         todo(undefined, action),
//       ];
//     case 'TOGGLE_TODO':
//       const newTodo = state.filter(todo => action.id===todo.id);
//       return state.map(t => todo(t, action));
//     default:
//       return state;
//   }
// };

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibility: visibilityFilter(state.visibility, action),
//   }
// }
// const _combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     let result = {};
//     for (const [key, value] of Object.entries(reducers)) {
//       result[key] = value(state[key], action);
//     }
//     return result;
//   }
// };
//
// const __combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     const newState = Object.keys(reducers).reduce(
//       (nextState, key) =>  {
//         nextState[key] = reducers[key](state[key], action);
//         return nextState;
//       },
//       {}
//     );
//     return newState;
//   }
// };

export default todos;

const getAllTodos = (state) => state.allId.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};
