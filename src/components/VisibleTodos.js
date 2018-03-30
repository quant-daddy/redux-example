import React from 'react';
import TodoList from './TodoList';
const ReactRedux = require('react-redux');
const { connect } = ReactRedux;

import { toggleTodo } from 'actions';

const getVisibleTodos = (todos, visibilityFilter) =>
  todos.filter(todo => {
      switch (visibilityFilter) {
        case "SHOW_COMPLETED":
        return todo.completed;
        case "SHOW_PENDING":
        return !todo.completed;
        case "SHOW_ALL":
        return true;
        default:
        return true;
      }
  });

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
};
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};
// container component for a presentation component requiring props using store.
const VisibleTodos = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

export default VisibleTodos;



// class VisibleTodos extends React.Component {
//
//   componentDidMount() {
//     this.unsubscribe = this.context.store.subscribe(() => {
//       this.forceUpdate();
//     });
//   }
//
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//
//   render() {
//     const { todos, visibilityFilter } = this.context.store.getState();
//     const visibleTodos = getVisibleTodos(todos, visibilityFilter);
//     return (<TodoList
//       todos={visibleTodos}
//       onTodoClick={(id) => {
//         this.context.store.dispatch({
//           type: 'TOGGLE_TODO',
//           id: id,
//         });
//       }}
//     >
//     </TodoList>);
//   }
// }
//
// VisibleTodos.contextTypes = {
//   store: PropTypes.object
// };
