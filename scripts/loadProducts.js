document.addEventListener("DOMContentLoaded", () => {
    showSection('add-product');
    document.getElementById('add-product-form').addEventListener('submit', addProduct);
    loadProducts('product-list-admin');
    loadProducts('product-list-client');
    loadSales();
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

/* Funciones Administrador */
function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const newProduct = { id: products.length + 1, name, price, description, stock: 0 };
    products.push(newProduct);
    loadProducts('product-list-admin');
    loadProducts('product-list-client');
    event.target.reset();
}

function loadProducts(listId) {
    const productList = document.getElementById(listId);
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${product.name}</strong> - $${product.price}<br>${product.description}<br><strong>Stock:</strong> ${product.stock}`;
        if (listId === 'product-list-admin') {
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editProduct(product.id));
            li.appendChild(editButton);
        } else if (listId === 'product-list-client') {
            const addButton = document.createElement('button');
            addButton.textContent = 'Agregar al carrito';
            addButton.addEventListener('click', () => addToCart(product));
            li.appendChild(addButton);
        }
        productList.appendChild(li);
    });
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const newPrice = prompt("Nuevo precio:", product.price);
        const newDescription = prompt("Nueva descripción:", product.description);
        const newStock = prompt("Nuevas unidades:", product.stock);
        if (newPrice !== null) product.price = parseFloat(newPrice);
        if (newDescription !== null) product.description = newDescription;
        if (newStock !== null) product.stock = parseInt(newStock);
        loadProducts('product-list-admin');
        loadProducts('product-list-client');
    }
}

function loadSales() {
    const salesList = document.getElementById('sales-list');
    salesList.innerHTML = '';
    sales.forEach(sale => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Producto:</strong> ${sale.productName}<br><strong>Cantidad:</strong> ${sale.quantity}<br><strong>Total:</strong> $${sale.total}`;
        salesList.appendChild(li);
    });
}

/* Funciones Cliente */
const cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    loadCart();
}

function loadCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product.name} - $${item.product.price} x ${item.quantity}`;
        total += item.product.price * item.quantity;
        cartList.appendChild(li);
    });
    const totalLi = document.createElement('li');
    totalLi.innerHTML = `<strong>Total: $${total}</strong>`;
    cartList.appendChild(totalLi);
}

function confirmPurchase() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.product.id);
        if (product) {
            product.stock -= item.quantity;
            sales.push({
                id: sales.length + 1,
                productName: product.name,
                quantity: item.quantity,
                total: product.price * item.quantity
            });
        }
    });
    cart.length = 0;
    loadProducts('product-list-client');
    loadCart();
    loadSales();
}