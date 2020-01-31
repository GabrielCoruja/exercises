import React from 'react';

import { Consumer } from './ShoppingCartContext';

const ProductList = () => (
  <Consumer>
    {({ products, addToCard }) => (
      <div>
        <h2>Produtos disponíveis</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{`R$${product.price}`}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => addToCard(product)}
                    >
                      Adicionar
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )}
  </Consumer>
);

export default ProductList;
