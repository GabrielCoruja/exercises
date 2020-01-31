import React from 'react';

import { Consumer } from './ShoppingCartContext';

const ShoppingCart = () => (
  <Consumer>
    {({ cart, totalPrice }) => (
      <div>
        <h2>Carrinho de compras</h2>
        <ul>
          {
            cart.map((product) => (
              <li key={product.id}>
                {product.title}
              </li>
            ))
          }
        </ul>
        <div>{`Total: R$${totalPrice.toFixed(2)}`}</div>
      </div>
    )}
  </Consumer>
);

export default ShoppingCart;
