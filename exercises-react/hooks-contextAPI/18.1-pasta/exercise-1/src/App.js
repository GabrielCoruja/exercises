import React from 'react';

import AddTodo from './components/AddTodo';
import FilterTodos from './components/FilterTodos';
import TodoList from './components/TodoList';
import { Provider } from './components/TodoContext';

const App = () => (
  <Provider>
    <AddTodo />
    <FilterTodos />
    <TodoList />
  </Provider>
);

export default App;
