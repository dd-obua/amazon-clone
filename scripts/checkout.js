import { select, selectAll } from '../scripts/select.js';
import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach(cartItem => {
  let pdtId = cartItem.pdtId;
  let matchingPdt;

  products.forEach(pdt => {
    if (pdt.id === pdtId) matchingPdt = pdt;
  });

  cartSummaryHTML += `
    <article class="cart-item-container" id="container-${matchingPdt.id}">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image" 
          src="${matchingPdt.image}"  
        />

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingPdt.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingPdt.priceCents)}
          </div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">
              ${cartItem.pdtQnty}
            </span> </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary" data-pdt-id="${
              matchingPdt.id
            }">
              Delete
            </span>           
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${matchingPdt.id}"
            />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingPdt.id}"
            />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingPdt.id}"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
});

const orderSummaryElem = select('.order-summary');
orderSummaryElem.innerHTML = cartSummaryHTML;

// Delete product
const deleteLink = selectAll('.delete-quantity-link');
deleteLink.forEach(link => {
  link.addEventListener('click', () => {
    const { pdtId } = link.dataset;
    removeFromCart(pdtId);

    const container = select(`#container-${pdtId}`);
    container.remove();
  });
});
