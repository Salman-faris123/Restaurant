// Function to update the cart display
function updateCart() {
    var cartList = document.getElementById('cart-items');
    var cartTotal = document.getElementById('cart-total');
    var total = 0;

    // Get the cart data from Web Storage (localStorage)
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the current cart display
    cartList.innerHTML = '';

    cart.forEach(function(item,index){
        if(!item || !item.name ||!item.price || !item.quantity){
            console.warn("Invalid item in cart :",item);
            return;
        }
        var serialNumber = index + 1;
        var itemTotal = item.price * item.quantity; // Calculate total for the item

        var li = document.createElement('li');
        li.innerHTML = `
         <div class="cart-item">
                <span>${serialNumber}. ${item.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}</span>
                 <button onclick="addOne('${item.name}')">+</button>
            <button onclick="removeOne('${item.name}', ${item.price})">-</button>
                 <button onclick="removeFromCart('${item.name}')">Remove</button>
         </div>
`;
cartList.appendChild(li);
total += itemTotal;
        });
        
    // Update the total cost
    cartTotal.textContent = '$' + total.toFixed(2);
}

// Function to remove one frequency of an item from the cart
function removeFromCart(itemName) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var updatedCart = [];
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === itemName && !found) {
            found = true;
        } else {
            updatedCart.push(cart[i]);
        }
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCart();
}

function addOne(itemName,itemPrice){
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart=cart.map(item=>{
        if(item.name ===itemName){
            item.quantity+=1;
        }
        return item;
    });
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCart();
}

function removeOne(itemName, itemPrice) {
var cart = JSON.parse(localStorage.getItem('cart')) || [];
cart=cart.map(item=>{
    if(item.name===itemName){
        item.quantity-=1;
    }
    return item;
}).filter(item=>item.quantity>0);

localStorage.setItem('cart', JSON.stringify(cart));

updateCart();
}

// Function to confirm the order
function confirmOrder() {
    // Here, you can implement the logic to send the order to the server or perform other actions
    alert('Order confirmed! Thank you for choosing My Restaurant.');
    localStorage.removeItem('cart'); // Clear the cart after confirming the order
    updateCart(); // Update the cart display
}

// Call the updateCart function when the cart page loads to populate the cart items
window.addEventListener('load', updateCart);