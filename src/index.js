import React from 'react';
import ReactDOM from 'react-dom';
const { createStore } = require('redux');

const todoApp = require('./todos');

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

const AddTodo = ({onAddClick}) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        onAddClick(input.value);
        input.value = '';
      }}>Add Todo</button>
    </div>
  );
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
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { filter, children } = this.props;
    const { visibilityFilter } = store.getState();
     return (
       <Link
         active={filter === visibilityFilter }
         onClick={() => store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         })}
         >{children}</Link>
     )
  }

}

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

const TodoApp = ({ todos, visibilityFilter }) => {
  const visibleTodos = getVisibleTodos(todos, visibilityFilter);
  return (
    <div>
      <AddTodo onAddClick={text => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextId++,
          text: text,
        });
      }}/>
      <TodoList todos={visibleTodos} onTodoClick={(id) => {
        store.dispatch({
          type: 'TOGGLE_TODO',
          id: id,
        });
      }}/>
      <Footer/>
    </div>
  )
}


const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()}/>,
    document.getElementById('root'));
  }

  store.subscribe(render);
  render();
