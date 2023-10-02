import { select, selectAll } from './select.js';
import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import { addToCart } from '../data/cart.js';

const mainPdtsContainer = select('.products-grid');

let pdtsHTML = '';

products.forEach(pdt => {
  pdtsHTML += `
    <article class="product-container">
      <div class="product-image-container">
        <img
          class="product-image"
          src="${pdt.image}"
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${pdt.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${pdt.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">${pdt.rating.count}</div>
      </div>

      <div class="product-price">$${(pdt.priceCents / 100).toFixed(2)}</div>

      <div class="product-quantity-container">
        <select class="pdt-qnty-${pdt.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart msg-div-${pdt.id}">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary" data-pdt-id="${
        pdt.id
      }">Add to Cart</button>
    </article>
  `;
});

mainPdtsContainer.innerHTML = pdtsHTML;

// Add products to cart
const btns = selectAll('.add-to-cart-button');
let msgTimeouts = {};

const showAddedMsg = pdtId => {
  // Display message
  const msgDiv = select(`.msg-div-${pdtId}`);
  msgDiv.classList.add('visible');

  // Clear any previous timout
  const previousTimeoutId = msgTimeouts[pdtId];
  if (previousTimeoutId) clearTimeout(previousTimeoutId);

  // Set new timeout for hidding the message
  const timeoutId = setTimeout(() => {
    msgDiv.classList.remove('visible');
  }, 2000);

  // Store new timeout id
  msgTimeouts[pdtId] = timeoutId;
};

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const { pdtId } = btn.dataset;
    addToCart(pdtId);
    showAddedMsg(pdtId);
  });
});
