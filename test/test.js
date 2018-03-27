const todos = require('./todos');
const deepFreeze = require('deep-freeze');
const expect = require('expect');

describe('TodoApp', () => {
  it('should add new items', () => {
    const stateBefore = {};
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: "hi"
    };

    const stateAfter = {
      todos: [{
        id: 0,
        text: "hi",
        completed: false,
      }],
      visibilityFilter: 'SHOW_ALL',
    };

    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });

  it('should toggle completed status', () => {
    const stateBefore = {
      todos: [
        {
          id: 1,
          text: "hi",
          completed: false,
        },
        {
          id: 2,
          text: "cool",
          completed: false,
        }
      ],
      visibilityFilter: 'SHOW_ALL',
    }

    const stateAfter = {
      todos: [
        {
          id: 1,
          text: "hi",
          completed: true,
        },
        {
          id: 2,
          text: "cool",
          completed: false,
        }
      ],
      visibilityFilter: 'SHOW_ALL',
    }

    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    };

    deepFreeze(action);
    deepFreeze(stateAfter);
    deepFreeze(stateBefore);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });


});
