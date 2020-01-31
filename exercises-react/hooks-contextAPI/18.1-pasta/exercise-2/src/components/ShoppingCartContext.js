import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = createContext();

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: 'Fone de ouvido',
      price: 20.89,
    },
    {
      id: 2,
      title: 'Vinho do porto',
      price: 57,
    },
    {
      id: 3,
      title: 'Copo lagoinha',
      price: 5.45,
    }],
  cart: [],
  totalPrice: 0,
};

class ShoppingCartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.addToCard = this.addToCard.bind(this);
  }

  addToCard(product) {
    this.setState((state) => ({
      products: [
        ...state.products,
      ],
      cart: [
        ...state.cart,
        { ...product },
      ],
      totalPrice: state.totalPrice + product.price,
    }));
  }

  render() {
    const { children } = this.props;

    const context = {
      ...this.state,
      addToCard: this.addToCard,
    };

    return (
      <Provider value={context}>
        {children}
      </Provider>
    );
  }
}

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ShoppingCartProvider as Provider, Consumer };
