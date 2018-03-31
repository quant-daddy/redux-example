import React from 'react';
import TodoList from './TodoList';
const ReactRedux = require('react-redux');
import { withRouter } from 'react-router'
const { connect } = ReactRedux;
import { getVisibleTodos } from 'reducers';
import { toggleTodo } from 'actions';

const mapStateToTodoListProps = (state, { match : {params}}) => ({
    todos: getVisibleTodos(state, params.filter ? params.filter : 'all')
});

// const mapDispatchToTodoListProps = (dispatch) => ({
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     },
// });
// container component for a presentation component requiring props using store.
const VisibleTodos = withRouter(connect(
  mapStateToTodoListProps,
  { onTodoClick: toggleTodo },
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
