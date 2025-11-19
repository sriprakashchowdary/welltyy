// index.js - Groceries page specific functionality

const products = [
    { id: 1, name: "Fresh Oranges", category: "fruits", price: 100, description: "Sweet and juicy", image: "images/oranges.jpg" },
    { id: 4, name: "Fresh Tomatoes", category: "fruits", price: 40, description: "Roma tomatoes", image: "images/tomato.jpg" },
    { id: 7, name: "Fresh Avocados", category: "fruits", price: 180, description: "Ripe Hass avocados", image: "images/avocado.jpg" },
    { id: 10, name: "Fresh Carrots", category: "fruits", price: 20, description: "Organic carrots", image: "images/carrots.jpg" },
    { id: 2, name: "Organic Milk", category: "dairy", price: 40, description: "Fresh Whole Milk", image: "images/milk.jpg" },
    { id: 5, name: "Farm Eggs", category: "dairy", price: 60, description: "Free range (12pk)", image: "images/eggs.jpg" },
    { id: 8, name: "Greek Yogurt", category: "dairy", price: 30, description: "Plain Yogurt", image: "images/yogurt.jpg" },
    { id: 3, name: "Whole Wheat Bread", category: "bakery", price: 50, description: "Freshly Baked", image: "images/bread.jpg" },
    { id: 9, name: "Croissants", category: "bakery", price: 60, description: "Butter Croissants", image: "images/crossiant.jpg" },
    { id: 6, name: "Basmati Rice", category: "pantry", price: 200, description: "Aged Rice (5kg)", image: "images/rice.jpg" },
    { id: 11, name: "Olive Oil", category: "pantry", price: 190, description: "Extra Virgin", image: "images/oliveoil.jpg" },
    { id: 12, name: "Orange Juice", category: "beverages", price: 80, description: "100% Juice", image: "images/orange_juice.jpg" }
];

// Define products for search functionality (used by common.js)
window.pageProducts = products.map(p => ({
    id: p.id, 
    name: p.name, 
    category: p.category, 
    url: 'groceries.html' // URL should link back to this page if necessary
}));


document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    // Removed the conflicting initApp() call
    setupNewsletterForm(); // Page specific setup
});

function renderProducts(filter = "all") {
    const grid = document.getElementById("productsGrid");
    const filtered = filter === "all"
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <img src="${p.image}" class="product-image" alt="${p.name}">
            <div class="product-info">
                <div class="product-category">${p.category}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-description">${p.description || ""}</div>
                <div class="product-footer">
                    <div class="product-price">₹${p.price}</div>
                    <button class="add-to-cart" onclick="triggerAddToCart(${p.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join("");
    setupScrollAnimations();
}

// Global function to trigger the common.js addToCart
function triggerAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Calls the global addToCart function defined in common.js
        addToCart(product); 
    }
}


document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.category);
    });
});

function setupScrollAnimations() {
    const cards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if(emailInput && emailInput.value) {
                showNotification('Thank you for subscribing! 10% off coupon sent.', 'success');
                this.reset();
            }
        });
    }
}
// Note: setupSmoothScrolling, setupHeaderScroll, and showNotification are already in common.js
// But since they were defined in your provided groceries.js, they are left here for completion 
// unless you confirm you want to remove them to avoid duplication.
// For now, I'll keep them as they override/exist locally. 

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

function setupHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        font-family: 'Inter', sans-serif;
    `;
    if (type === 'success') {
        notification.style.backgroundColor = '#00A847';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#2d3436';
    }
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}