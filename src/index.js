import React from 'react';
import ReactDOM from 'react-dom';
const ReactRedux = require('react-redux');

import VisibleTodos from 'components/VisibleTodos';
import AddTodo from 'components/AddTodo';
import Footer from 'components/Footer';

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

import configureStore from './configureStore';
const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
//module.exports = App;
