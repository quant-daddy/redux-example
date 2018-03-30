import React from 'react';
import TodoList from './TodoList';
const ReactRedux = require('react-redux');
import { withRouter } from 'react-router'
const { connect } = ReactRedux;

import { toggleTodo } from 'actions';

const getVisibleTodos = (todos, visibilityFilter) =>
  todos.filter(todo => {
      switch (visibilityFilter) {
        case "all":
        return true;
        case "pending":
        return !todo.completed;
        case "completed":
        return todo.completed;
        default:
        return true;
      }
  });

const mapStateToTodoListProps = (state, { match : {params}}) => {
  return {
    todos: getVisibleTodos(state.todos, params.filter)
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
const VisibleTodos = withRouter(connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList));

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
