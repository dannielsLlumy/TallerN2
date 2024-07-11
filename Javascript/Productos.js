document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

    // Verificar si hay artículos en el carrito almacenados en localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = JSON.parse(localStorage.getItem('cartTotal')) || 0;

    updateCartUI();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = button.dataset.product;
            const productPrice = parseFloat(button.dataset.price);

            // Agregar al carrito
            addToCart(productName, productPrice);
        });
    });

    function addToCart(productName, productPrice) {
        cartItems.push({ name: productName, price: productPrice });
        cartTotal += productPrice;

        // Actualizar localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal));

        // Actualizar UI
        updateCartUI();
    }

    function updateCartUI() {
        cartCount.textContent = cartItems.length;

        // Limpiar lista de items del modal
        const cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = '';

        // Mostrar cada item en el carrito dentro del modal
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
        });

        // Mostrar total en el modal
        const cartTotalElement = document.getElementById('cart-total');
        cartTotalElement.textContent = cartTotal.toFixed(2);
    }

    // Mostrar el modal cuando se haga click en el ícono de carrito
    document.getElementById('cart-icon').addEventListener('click', function() {
        cartModal.show();
    });

    // Limpiar carrito al cerrar el modal
    cartModal._element.addEventListener('hidden.bs.modal', function() {
        cartItems = [];
        cartTotal = 0;
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
        updateCartUI();
    });
});
document.getElementById('cart-icon').addEventListener('click', function() {
    cartModal.show();
});