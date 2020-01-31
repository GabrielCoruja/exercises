import { ADD_TO_CART } from '../actions/product';

const INITIAL_STATE = {
  products: [{
    id: 1,
    title: 'Fone de ouvido',
    price: 20.89,
  }, {
    id: 2,
    title: 'Vinho do porto',
    price: 57,
  }, {
    id: 3,
    title: 'Copo lagoinha',
    price: 5.45,
  }],
  cart: [],
  totalPrice: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        products: [
          ...state.products,
        ],
        cart: [
          ...state.cart,
          { ...action.product },
        ],
        totalPrice: state.totalPrice + action.product.price,
      };
    default:
      return state;
  }
};

export default reducer;
