import React from 'react';
import { connect } from 'react-redux';

import * as ProductActions from '../store/actions/product';

const ProductList = ({ products, addToCard }) => (
  <div>
    <h2>Produtos disponíveis</h2>
    <table>
      <thead>
        <tr>
        <th>Título</th>
        <th>Preço</th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>R${product.price}</td>
              <td><button type="button" onClick={() => addToCard(product)}>Adicionar</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

const mapStateToProps = (state) => ({
  products: state.product.products,
});

const mapDispatchToProps = (dispatch) => ({
  addToCard: (product) => dispatch(ProductActions.addToCard(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
