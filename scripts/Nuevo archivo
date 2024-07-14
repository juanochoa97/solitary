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

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const newProduct = { id: products.length + 1, name, price, description };
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
        li.innerHTML = `<strong>${product.name}</strong> - $${product.price}<br>${product.description}`;
        if (listId === 'product-list-client') {
            const button = document.createElement('button');
            button.textContent = 'Agregar al carrito';
            button.addEventListener('click', () => addToCart(product));
            li.appendChild(button);
        }
        productList.appendChild(li);
    });
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

function addToCart(product) {
    const cartList = document.getElementById('cart-list');
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
}
