import { select } from '../scripts/select.js';
export const cart = [];

let pdtCount = 0;

const updateCartQnty = pdtQnty => {
  pdtCount += pdtQnty;
  const cartQntyElem = select('.cart-quantity');
  cartQntyElem.textContent = pdtCount;
};

export const addToCart = pdtId => {
  const pdtQnty = Number(select(`.pdt-qnty-${pdtId}`).value);

  let matchingItem;
  cart.forEach(cartItem => {
    if (cartItem.pdtId === pdtId) matchingItem = cartItem;
  });

  if (matchingItem) matchingItem.pdtQnty += pdtQnty;
  else cart.push({ pdtId, pdtQnty });

  updateCartQnty(pdtQnty);
};
