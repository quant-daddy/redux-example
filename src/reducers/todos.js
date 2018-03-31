const { combineReducers } = require('redux');
import todo from './todo';


const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return { ...state, [action.id]: todo(state[action.id], action)};
    default:
      return state;
  };
};

const allId = (state=[], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allId
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

export const getVisibleTodos = (state, visibilityFilter) => {
  const allTodos = getAllTodos(state);
  console.log(allTodos);
  switch (visibilityFilter) {
    case "all":
      return allTodos;
    case "pending":
      return allTodos.filter(todo => !todo.completed);
    case "completed":
      return allTodos.filter(todo => todo.completed);
    default:
      return new Error(`invalid visibility filter ${visibilityFilter}`);
  }
};
