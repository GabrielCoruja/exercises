import React from 'react';
import { Consumer } from './TodoContext';

const getTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'done':
      return todos.filter((todo) => todo.completed);
    case 'progress':
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
};

const TodoList = () => (
  <Consumer>
    {({ todos, toogleTodo, filter }) => (
      <ul>
        {
          getTodos(todos, filter).map((todo) => (
            <li
              key={todo.id}
              onClick={() => toogleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </li>
          ))
        }
      </ul>
    )}
  </Consumer>
);

export default TodoList;
