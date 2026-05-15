// Sample Menu Data
const menuData = [
    { id: 1, name: "Zinger Deluxe", price: 850, category: "burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", desc: "Crispy chicken with secret sauce" },
    { id: 2, name: "Grilled Platter", price: 1600, category: "bbq", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80", desc: "Mixed grilled meats with dip" },
    { id: 3, name: "Cold Brew", price: 450, category: "coffee", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80", desc: "Smooth 12-hour steep" }
];

let cart = JSON.parse(localStorage.getItem('skyline_cart')) || [];

// Initialize Menu
function displayMenu(items) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.img}" alt="${item.name}" class="menu-img">
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="price">Rs. ${item.price}</div>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Cart Logic
window.addToCart = (id) => {
    const item = menuData.find(p => p.id === id);
    const inCart = cart.find(p => p.id === id);

    if (inCart) {
        inCart.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
};

function updateCart() {
    localStorage.setItem('skyline_cart', JSON.stringify(cart));
    renderCart();
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>Rs. ${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    totalEl.innerText = `Rs. ${total}`;
}

// WhatsApp Integration
document.getElementById('whatsapp-order').addEventListener('click', () => {
    if (cart.length === 0) return alert("Cart is empty!");

    let message = "Hello, I want to order:\n";
    cart.forEach(item => {
        message += `- ${item.quantity} x ${item.name}\n`;
    });
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `Total: Rs. ${total}`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/923343409099?text=${encodedMsg}`, '_blank');
});

// UI Interactions
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');

cartBtn.onclick = () => cartSidebar.classList.add('active');
closeCart.onclick = () => cartSidebar.classList.remove('active');

// Sticky Navbar on Scroll
window.onscroll = () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    displayMenu(menuData);
    updateCart();
});