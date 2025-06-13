// Cart logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function loadCart() {
  const cartContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartContainer) return;
  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeItem(${index})">Remove</button>`;
    cartContainer.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  localStorage.removeItem('cart');
  loadCart();
}

// Login/Register
function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  alert(`Welcome back, ${user}!`);
  window.location.href = 'index.html';
}

function handleRegister(e) {
  e.preventDefault();
  const user = document.getElementById('newUsername').value;
  alert(`Account created for ${user}`);
  window.location.href = 'login.html';
}

// Admin panel
function addProduct(e) {
  e.preventDefault();
  const name = document.getElementById('adminProductName').value;
  const price = parseFloat(document.getElementById('adminProductPrice').value);
  const image = document.getElementById('adminProductImage').value;
  const category = document.getElementById('adminProductCategory').value;

  const productGrid = document.getElementById('adminProductList');
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${image}" alt="${name}" />
    <h3>${name}</h3>
    <p>$${price.toFixed(2)}</p>
    <p><small>${category}</small></p>
  `;
  productGrid.appendChild(div);

  alert(`${name} added to store.`);
  e.target.reset();
}

// Load cart items if on cart page
document.addEventListener('DOMContentLoaded', loadCart);
