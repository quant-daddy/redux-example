import React from 'react';
import ReactDOM from 'react-dom';
const { createStore } = require('redux');
const todoApp = require('./todos');
import PropTypes from 'prop-types';
const ReactRedux = require('react-redux');
const { connect } = ReactRedux;

let nextId = 0;

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextId++,
    text,
  }
};

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};


const Todo = ({ completed, text, onClick }) => {
  return (
    <li onClick={() => onClick()}
    style={{textDecoration: completed ? 'line-through' : 'none'}}>
      {text}
    </li>
  );
};

const TodoList = ({todos, onTodoClick}) => {
  return (
    <ul>
      {todos.map(todo =>
        <Todo key={todo.id} onClick={() => onTodoClick(todo.id)} {...todo}/>
      )
      }
    </ul>
  )
};

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

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>Add Todo</button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

const Link = ({active, onClick, children}) => {
  if (active) return <span>{children}</span>;
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick(e);}
      }
    >{children}
    </a>);
};

const mapStateToFilterLinkProps = (state, ownProps) => {
  return {
    active: state.visibilityFilter === ownProps.filter,
  };
};

const mapDispatchToFilterLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
  };
};

const FilterLink = connect(
  mapStateToFilterLinkProps,
  mapDispatchToFilterLinkProps
)(Link);
//
// class FilterLink extends React.Component {
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
//     const { filter, children } = this.props;
//     const { visibilityFilter } = this.context.store.getState();
//      return (
//        <Link
//          active={filter === visibilityFilter }
//          onClick={}
//          >{children}</Link>
//      )
//   }
//
// }

// FilterLink.contextTypes = {
//   store: PropTypes.object
// };

const Footer = () => (
  <div>
    <FilterLink filter="SHOW_ALL" >All</FilterLink> &nbsp;
    <FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink> &nbsp;
    <FilterLink filter="SHOW_PENDING" >Pending</FilterLink>
  </div>
);

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

const TodoApp = ({ store }) => {
  return (
    <div>
      <AddTodo />
      <VisibleTodos />
      <Footer />
    </div>
  )
}

const { Provider } = ReactRedux;

// created specifically for context, doens't have to be this way
// class Provider extends React.Component {
//
//   getChildContext() {
//     return {
//       store: store
//     }
//   }
//
//   render() {
//     return this.props.children;
//   }
//
// }
//
// Provider.childContextTypes = {
//   store: PropTypes.object
// };

const App = () => {
  return (
    <Provider store={createStore(todoApp)}>
      <TodoApp />
    </Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// export default App;
module.exports = App;
