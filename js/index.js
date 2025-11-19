// index.js - Home page specific functionality

// Define products for search functionality
window.pageProducts = [
    { id: 1, name: "Fashion Collection", category: "Fashion", url: "fashion.html" },
    { id: 2, name: "Accessories", category: "Accessories", url: "accessories.html" },
    { id: 3, name: "Groceries", category: "Groceries", url: "groceries.html" }
];

// Page-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
});

function setupScrollAnimations() {
    const cards = document.querySelectorAll('.category-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}