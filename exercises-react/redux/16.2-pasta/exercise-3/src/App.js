import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

const App = () => (
  <Provider store={store}>
    <ProductList />
    <ShoppingCart />
  </Provider>
);

export default App;
