import React from 'react';
import TodoList from './TodoList';
const ReactRedux = require('react-redux');
import { withRouter } from 'react-router'
const { connect } = ReactRedux;
import { getVisibleTodos } from 'reducers';
import * as actions from 'actions';

const mapStateToTodoListProps = (state, { match : {params}}) => {
  const filter = params.filter ? params.filter : 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

class VisibleTodos extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter)
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />
  }

}

// const mapDispatchToTodoListProps = (dispatch) => ({
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     },
// });
// container component for a presentation component requiring props using store.
VisibleTodos = withRouter(connect(
  mapStateToTodoListProps,
  actions,
)(VisibleTodos));

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
