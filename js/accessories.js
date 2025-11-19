/* --- CART LOGIC --- */
let cartCount = 0;

function addToCart(productName) {
    cartCount++;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    }
    alert(productName + " has been added to your cart!");
}

/* --- NOTIFICATION LOGIC --- */
function showNotification(event, categoryName) {
    // 1. Prevent immediate page jump
    event.preventDefault();

    // 2. Get elements
    const toast = document.getElementById('toast-notification');
    const message = document.getElementById('toast-message');

    if (toast && message) {
        // 3. Set Message
        message.innerText = `Exploring ${categoryName} Collection...`;

        // 4. Show Toast (Slide In)
        toast.classList.add('show');

        // 5. Hide Toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            
            // Optional: Actually redirect after the notification
            // window.location.href = event.currentTarget.href; 
        }, 3000);
    }
}