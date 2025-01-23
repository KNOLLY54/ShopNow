const products = [
    { id: 1, name: "Smartphone", price: 2500, image: "images/smartphone.webp" },
    { id: 2, name: "Headphones", price: 150, image: "images/headphones.jpg" },
    { id: 3, name: "Laptop", price: 1550, image: "images/laptopp.jpg" },
    { id: 4, name: "Watch", price: 299, image: "images/watchh.jpg" },
    { id: 5, name: "Tablet", price: 1750, image: "images/tablet.jpg" },
    { id: 6, name: "Camera", price: 1059, image: "images/camera.jpg" },
    { id: 7, name: "Smart TV", price: 769, image: "images/smart_tv.jpg" },
    { id: 8, name: "Speaker", price: 399, image: "images/speaker.jpg" },
    { id: 9, name: "Washing Machine", price: 1999, image: "images/washing.jpg" },
    { id: 10, name: "Refrigerator", price: 2190, image: "images/refrigerator.jpg" },
    { id: 11, name: "Dish Washer", price: 1023, image: "images/dishwasher.jpg" },
    { id: 12, name: "Vacum Cleaner", price: 789, image: "images/vacum.jpg" },
];

const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
let cart = [];

// Background images for the hero section
const heroImages = [
    'images/bk3.jpg',
    'images/bk1.jpg',
    'images/bk2.jpg',
    'images/bk4.png',
    'images/bk5.jpg',
    'images/bk6.jpg'
];
let currentImageIndex = 0;

function renderProducts() {
    productGrid.innerHTML = products
        .map(
            product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>`
        )
        .join('');
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) {
        alert("Product not found!");
        return;
    }
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity += 1; // Increment quantity if product already in cart
    } else {
        cart.push({ product, quantity: 1 }); // Add new product with quantity 1
    }

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0); // Update cart count
    alert(`${product.name} added to cart!`);
}

// Change background image function with sliding effect
function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + heroImages.length) % heroImages.length;
    const heroSection = document.querySelector('.hero');
    heroSection.style.opacity = 0; // Fade out
    setTimeout(() => {
        heroSection.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
        heroSection.style.opacity = 1; // Fade in
    }, 500); // Duration of fade out
}

// Set interval for automatic image change
setInterval(() => changeImage(1), 5000); // Change image every 5 seconds

// Initial background image
changeImage(0);

// Function to update the cart display
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}">
            <span>${item.product.name} (x${item.quantity})</span>
            <span>$${item.product.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total}`;
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCart();
}

// Function to toggle the visibility of the cart modal
function toggleCartModal() {
    if (cartModal.style.display === 'flex') {
        cartModal.style.display = 'none';
    } else {
        updateCart(); // Update the cart display before showing the modal
        cartModal.style.display = 'flex';
    }
}

renderProducts();
