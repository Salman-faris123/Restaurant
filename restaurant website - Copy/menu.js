function addToCart(itemName, itemPrice) {
    // Get the cart data from Web Storage (localStorage)
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    var existingItem=cart.find(item=>item.name===itemName);

    if(existingItem){
        existingItem.quantity+=1;

    }
    else{
    // Add the selected item to the cart
    cart.push({ name: itemName, price: itemPrice ,quantity :1});
    }
    // Store the updated cart data back in Web Storage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart updated",cart);
}

function filterMenu(category) {
    var menuItems = document.getElementsByClassName('menu-item');

    if (category === 'all') {
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].style.display = '';
        }
    } else {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].classList.contains(category)) {
                menuItems[i].style.display = '';
            } else {
                menuItems[i].style.display = 'none';
            }
        }
    }
}