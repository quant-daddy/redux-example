import React from 'react';

import VisibleTodos from './VisibleTodos';
import AddTodo from './AddTodo';
import Footer from './Footer';

const App = ({ match: { params } }) => {
  return (
    <div>
      <AddTodo />
      <VisibleTodos />
      <Footer />
    </div>
  )
};

export default App;
