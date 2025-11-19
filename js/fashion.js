// fashion.js - Fashion page specific functionality

// Fashion products database
const fashionProducts = [
    { id: 101, name: "Floral Summer Dress", category: "women", price: 49.99, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60" },
    { id: 102, name: "Premium Cotton Tee", category: "men", price: 24.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60" },
    { id: 103, name: "Velvet Evening Gown", category: "women", price: 129.00, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&auto=format&fit=crop&q=60" },
    { id: 104, name: "Urban Denim Jacket", category: "men", price: 75.50, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60" },
    { id: 105, name: "Red Sport Runners", category: "footwear", price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" },
    { id: 106, name: "Linen Beach Shirt", category: "men", price: 35.00, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60" },
    { id: 107, name: "Leather Tote Bag", category: "women", price: 150.00, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60" },
    { id: 108, name: "Chic Blazer", category: "women", price: 65.00, image: "https://images.unsplash.com/photo-1551028719-ac66e624ecd6?w=500&auto=format&fit=crop&q=60" }
];

// Make products available for search
window.pageProducts = fashionProducts.map(p => ({
    id: p.id,
    name: p.name,
    category: "Fashion",
    url: "fashion.html"
}));

// Page initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupFilterButtons();
    setupSortSelect();
});

// Render products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    
    const filteredProducts = filter === 'all' 
        ? fashionProducts 
        : fashionProducts.filter(p => p.category === filter);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="wishlist-btn" onclick="toggleWishlist(event)">
                <i class="far fa-heart"></i>
            </div>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="rating">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
                </div>
                <div class="price-row">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-cart-btn" onclick='handleAddToCart(${JSON.stringify(product)})'>
                        <i class="fas fa-shopping-bag"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle Add to Cart
function handleAddToCart(product) {
    addToCart(product); // From common.js
    
    // Visual feedback
    const buttons = document.querySelectorAll('.add-cart-btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Add')) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.style.backgroundColor = '#FF4F81';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.backgroundColor = '';
            }, 2000);
        }
    });
}

// Toggle Wishlist
function toggleWishlist(event) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#FF4F81';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
    }
}

// Setup Filter Buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-tags button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.textContent.trim().toLowerCase();
            renderProducts(filterValue);
        });
    });
}

// Setup Sort Select
function setupSortSelect() {
    const sortSelect = document.querySelector('.sort-option select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortType = e.target.value;
            let sortedProducts = [...fashionProducts];
            
            if (sortType === 'Price: Low to High') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (sortType === 'Price: High to Low') {
                sortedProducts.sort((a, b) => b.price - a.price);
            }
            
            // Re-render with sorted products
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = sortedProducts.map(product => `
                <div class="product-card">
                    <div class="wishlist-btn" onclick="toggleWishlist(event)">
                        <i class="far fa-heart"></i>
                    </div>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="rating">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
                        </div>
                        <div class="price-row">
                            <span class="price">$${product.price.toFixed(2)}</span>
                            <button class="add-cart-btn" onclick='handleAddToCart(${JSON.stringify(product)})'>
                                <i class="fas fa-shopping-bag"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        });
    }
}