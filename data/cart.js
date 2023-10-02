import { select } from '../scripts/select.js';
export const cart = [
  { pdtId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', pdtQnty: 2 },
  { pdtId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', pdtQnty: 1 },
];

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
