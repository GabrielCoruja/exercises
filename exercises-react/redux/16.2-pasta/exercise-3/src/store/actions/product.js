export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCard = (product) => ({
  type: ADD_TO_CART,
  product,
});
