import React from 'react';

import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import { Provider } from './components/ShoppingCartContext';

const App = () => (
  <Provider>
    <ProductList />
    <ShoppingCart />
  </Provider>
);
export default App;
