import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = createContext();

class TodoProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentId: 1,
      filter: 'all',
    };
    this.addTodo = this.addTodo.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
    this.toogleTodo = this.toogleTodo.bind(this);
  }

  addTodo(text) {
    this.setState((state) => ({
      todos: [
        ...state.todos,
        {
          id: state.currentId,
          text,
          completed: false,
        },
      ],
      currentId: state.currentId + 1,
    }));
  }

  filterTodos(filter) {
    this.setState((state) => ({
      ...state,
      filter,
    }));
  }

  toogleTodo(todoId) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((todo) => (
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )),
    }));
  }

  render() {
    const { children } = this.props;

    const context = {
      ...this.state,
      addTodo: this.addTodo,
      filterTodos: this.filterTodos,
      toogleTodo: this.toogleTodo,
    };

    return (
      <Provider value={context}>
        {children}
      </Provider>
    );
  }
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TodoProvider as Provider, Consumer };
