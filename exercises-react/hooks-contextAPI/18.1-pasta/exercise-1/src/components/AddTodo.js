import React from 'react';

import { Consumer } from './TodoContext';

const AddTodo = () => {
  let input;

  return (
    <Consumer>
      {({ addTodo }) => (
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            addTodo(input.value);
            input.value = '';
          }}
          >
            <input ref={(node) => { input = node; }} />
            <button type="submit">
              Add Todo
            </button>
          </form>
        </div>
      )}
    </Consumer>
  );
};

export default AddTodo;
