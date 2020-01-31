import React from 'react';
import { connect } from 'react-redux';

const ShoppingCart = ({ products, totalPrice }) => (
  <div>
    <h2>Carrinho de compras</h2>
    <ul>
      {
        products.map((product, index) => (
          <li key={index}>
            {product.title}
          </li>
        ))
      }
    </ul>
    <div>Total: R${totalPrice.toFixed(2)}</div>
  </div>
);

const mapStateToProps = (state) => ({
  products: state.product.cart,
  totalPrice: state.product.totalPrice,
});

export default connect(mapStateToProps)(ShoppingCart);
