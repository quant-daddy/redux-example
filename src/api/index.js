import { v4 } from 'uuid';

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fakeTodos = {
  todos: [
    {
      id: v4(),
      text: 'hey',
      completed: false
    },
    {
      id: v4(),
      text: 'ho',
      completed: true
    },
    {
      id: v4(),
      text: 'cool',
      completed: false
    }
  ]
};

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Boom!');
    // }
    switch (filter) {
      case 'all':
        return fakeTodos.todos;
      case 'pending':
        return fakeTodos.todos.filter(t => !t.completed);
      case 'completed':
        return fakeTodos.todos.filter(t => t.completed);
      default:
        return new Error('what the fuck are you doing');
    }
  });


export function addTodo(text) {
  return delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    };
    fakeTodos.todos.push(todo);
    return todo;
  });
}

export function toggleTodo(id) {
  return delay(500).then(() => {
    const todo = fakeTodos.todos.find(t => t.id===id);
    todo.completed = !todo.completed;
    return todo;
  })
}
