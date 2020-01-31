import React from 'react';

import { Consumer } from './TodoContext';

const FilterTodos = () => (
  <Consumer>
    {({ filterTodos }) => (
      <div>
        <button type="button" onClick={() => filterTodos('all')}>Todos</button>
        <button type="button" onClick={() => filterTodos('done')}>Finalizados</button>
        <button type="button" onClick={() => filterTodos('progress')}>Em andamento</button>
      </div>
    )}
  </Consumer>
);

export default FilterTodos;
