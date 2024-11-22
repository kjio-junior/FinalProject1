const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',() => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click',() => {
        nav.classList.remove('active');
    })
}
// ----------------------------------SINGLE PRODUCT---------------------------------------
const sizePrices = {
    xxl: 150,
    xl: 145,
    l: 140,
    m: 135
};
 
// Get elements
const sizeSelector = document.getElementById('size-selector');
const priceDisplay = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const buyNowButton = document.getElementById('buy-now');

// Get the product name from the h4 element
const productName = document.querySelector('.single-pro-details h4').textContent;

// Function to update the price
function updatePrice() {
    const selectedSize = sizeSelector.value;
    const quantity = parseInt(quantityInput.value) || 1;

    if (sizePrices[selectedSize]) {
        const totalPrice = sizePrices[selectedSize] * quantity;
        priceDisplay.textContent = `$${totalPrice}`;
    } else {
        priceDisplay.textContent = "Choose Size Below"; // Default price
    }
}

// Function to handle the Buy Now button click
function handleBuyNow() {
    const selectedSize = sizeSelector.value;
    const quantity = parseInt(quantityInput.value) || 1;

    if (sizePrices[selectedSize]) {
        const totalPrice = sizePrices[selectedSize] * quantity;
        const checkoutUrl = `checkout.html?name=${encodeURIComponent(productName)}&size=${selectedSize}&quantity=${quantity}&price=${totalPrice}`;
        window.open(checkoutUrl, '_blank'); // Open in new tab
    } else {
        alert("Please select a size before proceeding.");
    }
}

// Listen for changes in size selector and quantity input
sizeSelector.addEventListener('change', updatePrice);
quantityInput.addEventListener('input', updatePrice);
buyNowButton.addEventListener('click', handleBuyNow);

 // ---------------------------------------CART FUNCTION-------------------------------------------
 // Function to handle the Add to Cart button click
function handleAddToCart() {
    const selectedSize = sizeSelector.value;
    const quantity = parseInt(quantityInput.value) || 1;

    if (sizePrices[selectedSize]) {
        const totalPrice = sizePrices[selectedSize] * quantity;
        const cartItem = {
            name: productName,
            size: selectedSize,
            quantity: quantity,
            price: sizePrices[selectedSize],
            image: document.getElementById('MainImg').src // Get the main image source
        };

        // Get existing cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push(cartItem); // Add new item to cart
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Save to localStorage

        alert("Item added to cart!");
    } else {
        alert("Please select a size before adding to cart.");
    }
}

// Modify the event listener for the Add to Cart button
document.querySelector('.normal:not(#buy-now)').addEventListener('click', handleAddToCart);

