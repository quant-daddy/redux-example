import React from 'react';
import TodoList from './TodoList';
const ReactRedux = require('react-redux');
import { withRouter } from 'react-router'
const { connect } = ReactRedux;
import { getVisibleTodos, getIsFetching , getErrorMessage } from 'reducers';
import * as actions from 'actions';
import FetchError from './FetchError';

const mapStateToTodoListProps = (state, { match : {params}}) => {
  console.log('calling mapStateToTodoListProps');
  const filter = params.filter ? params.filter : 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter)
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

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate called');
    return true;
  }

  fetchData() {
    const { filter, requestTodos, fetchTodos } = this.props;
    fetchTodos(filter).then(() => console.log('done'));
  }

  render() {
    const { toggleTodo, todos, isFetching, errorMessage } = this.props;
    if (isFetching && !todos.length) {
      return <div>Loading...</div>
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />
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
