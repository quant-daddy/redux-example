import React from 'react';
import ReactDOM from 'react-dom';
const { createStore } = require('redux');
const todoApp = require('./todos');
import PropTypes from 'prop-types';

const store = createStore(todoApp);
let nextId = 0;


const Todo = ({ completed, text, onClick }) => {
  return (
    <li onClick={() => onClick()}
    style={{textDecoration: completed ? 'line-through' : 'none'}}>
      {text}
    </li>
  );
};


class VisibleTodos extends React.Component {

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { todos, visibilityFilter } = this.context.store.getState();
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (<TodoList
      todos={visibleTodos}
      onTodoClick={(id) => {
        this.context.store.dispatch({
          type: 'TOGGLE_TODO',
          id: id,
        });
      }}
    >
    </TodoList>);
  }
}

VisibleTodos.contextTypes = {
  store: PropTypes.object
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

const AddTodo = (props, {store}) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextId++,
          text: input.value,
        });
        input.value = '';
      }}>Add Todo</button>
    </div>
  );
};

AddTodo.contextTypes = {
  store: PropTypes.object
};

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

class FilterLink extends React.Component {

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { filter, children } = this.props;
    const { visibilityFilter } = this.context.store.getState();
     return (
       <Link
         active={filter === visibilityFilter }
         onClick={() => this.context.store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         })}
         >{children}</Link>
     )
  }

}

FilterLink.contextTypes = {
  store: PropTypes.object
};

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

// created specifically for context, doens't have to be this way
class Provider extends React.Component {

  getChildContext() {
    return {
      store: store
    }
  }

  render() {
    return this.props.children;
  }

}

Provider.childContextTypes = {
  store: PropTypes.object
};

ReactDOM.render(
  <Provider>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
