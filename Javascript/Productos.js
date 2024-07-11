document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartModalElement = document.getElementById('cartModal');
    const cartModal = new bootstrap.Modal(cartModalElement);

    // Obtener artículos del carrito del localStorage al cargar la página
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = JSON.parse(localStorage.getItem('cartTotal')) || 0;

    // Función para actualizar la interfaz de usuario del carrito
    function updateCartUI() {
        cartCount.textContent = cartItems.length;

        const cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = '';

        let total = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        // Mostrar el total actualizado en la UI
        document.getElementById('cart-total').textContent = total.toFixed(2);

        // Guardar total en localStorage
        cartTotal = total;
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    }

    // Función para agregar un producto al carrito
    function addToCart(productName, price) {
        // Agregar producto al arreglo de productos del carrito
        cartItems.push({ name: productName, price: price });

        // Actualizar contador del carrito
        cartCount.textContent = cartItems.length;

        // Guardar carrito en localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Actualizar modal del carrito
        updateCartModal();

        // Actualizar UI general del carrito
        updateCartUI();
    }

    // Función para actualizar el contenido del modal del carrito
    function updateCartModal() {
        const cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsElement.appendChild(li);
            total += item.price;
        });

        // Mostrar total en el modal del carrito
        document.getElementById('cart-total').textContent = total.toFixed(2);

        // Guardar total en localStorage
        cartTotal = total;
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    }

    // Asignar evento click a los botones "Agregar al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.product;
            const price = parseFloat(this.dataset.price);
            addToCart(productName, price);
        });
    });

    // Mostrar modal del carrito al hacer clic en el ícono del carrito
    document.getElementById('cart-icon').addEventListener('click', function() {
        updateCartModal(); // Actualizar el contenido del modal antes de mostrarlo
        cartModal.show();
    });

    // Limpiar carrito al cerrar el modal
    cartModalElement.addEventListener('hidden.bs.modal', function() {
        cartItems = [];
        cartTotal = 0;
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
        updateCartUI();
    });

    // Actualizar la interfaz de usuario del carrito al cargar la página
    updateCartUI();
});
