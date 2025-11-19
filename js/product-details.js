document.addEventListener('DOMContentLoaded', () => {
    
    // --- DUMMY PRODUCT DATA (Required for common.js addToCart function) ---
    // Use the actual data from the page for consistency
    const PRODUCT_DATA = {
        id: 101, 
        name: "Michael Kors Watch MK3897",
        // NOTE: price should be parsed as a number if you use it globally
        price: 11216.00, 
        category: "Accessories",
        url: 'product-details.html'
    };

    // --- VARIABLES ---
    const sizeButtons = document.querySelectorAll('.size-btn');
    const addToBagBtn = document.querySelector('.btn-add-bag');
    const wishlistBtn = document.querySelector('.btn-wishlist');
    const pincodeCheckBtn = document.querySelector('.pincode-box button');
    const pincodeInput = document.querySelector('.pincode-box input');

    // --- 1. SIZE SELECTION ---
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // --- 2. ADD TO BAG LOGIC (FIXED) ---
    addToBagBtn.addEventListener('click', function() {
        
        // 1. Trigger Visual Feedback
        const originalContent = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ADDING...';
        this.style.opacity = '0.8';

        setTimeout(() => {
            
            // 2. Call the GLOBAL addToCart function from common.js
            if (typeof addToCart === 'function') {
                // Pass the product object to common.js to handle state, storage, and count update
                addToCart(PRODUCT_DATA); 
            } else {
                console.error("common.js addToCart function not available.");
            }
            
            // 3. Complete Visual Feedback
            this.innerHTML = '<i class="fas fa-check"></i> ADDED';
            this.style.backgroundColor = '#03a685'; // Success Green
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.backgroundColor = ''; // Reset to CSS default (Pink)
                this.style.opacity = '1';
            }, 2000);
        }, 1000);
    });

    // --- 3. WISHLIST TOGGLE ---
    wishlistBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if(this.classList.contains('added')) {
            this.classList.remove('added');
            this.style.borderColor = '#d4d5d9';
            this.style.color = '#282c3f';
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = 'inherit';
        } else {
            this.classList.add('added');
            this.style.borderColor = '#FF4F81';
            this.style.color = '#FF4F81'; // Pink text
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#FF4F81';
        }
    });

    // --- 4. PINCODE CHECK ---
    pincodeCheckBtn.addEventListener('click', () => {
        const code = pincodeInput.value;
        if(code.length === 6 && !isNaN(code)) {
            pincodeCheckBtn.textContent = "Available";
            pincodeCheckBtn.style.color = "#03a685";
        } else {
            alert("Please enter a valid 6-digit pincode");
        }
    });

    // Define the current product list for inline search
    window.pageProducts = [{
        id: PRODUCT_DATA.id,
        name: PRODUCT_DATA.name,
        category: PRODUCT_DATA.category,
        url: PRODUCT_DATA.url
    }];
});