import { select } from '../scripts/select.js';

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

let pdtCount = 0;

const saveToStorage = () => localStorage.setItem('cart', JSON.stringify(cart));

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

  saveToStorage();

  updateCartQnty(pdtQnty);
};

export const removeFromCart = pdtId => {
  const newCart = cart.filter(cartItem => pdtId !== cartItem.pdtId);
  cart = newCart;

  saveToStorage();
};
