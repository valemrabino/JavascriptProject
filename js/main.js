//aplicando DOM al carrito

const products = [
    { id: 1, name: 'Soporte', price: 3000 },
    { id: 2, name: 'Llaveros', price: 250 },
    { id: 3, name: 'Maceta', price: 2500 },
];


const cartItems = [];
const url = './productos.json';
document.addEventListener('DOMContentLoaded', function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            products = data;
            loadProducts(products);
        })
        .catch(error => console.error('Error al cargar datos de productos:', error));
});

function loadProducts(products) {
    const productsContainer = document.getElementById('products');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.dataset.id = product.id;
        productElement.innerHTML = `
            <img src="${products.image}" alt="${product.name}">
            <h3>${products.name}</h3>
            <p>$${products.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const existItem = cartItems.find(item => item.id === productId);

        if (existItem) {
            existItem.contador++;
        } else {
            cartItems.push({ id: productId, contador: 1 });
        }

        updateCart();
    }
}

function removeFromCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    cartItems.splice(itemIndex, 1);

    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsElement.innerHTML = '';

    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const productTotal = item.contador * product.price;

        const cartItemElement = document.createElement('li');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${product.name} x${item.contador}</span>
            <span>$${productTotal.toFixed(2)}</span>
            <button class="delete" onclick="removeFromCart(${item.id})">Eliminar</button>
        `;

        cartItemsElement.appendChild(cartItemElement);
    });

    const total = cartItems.reduce((acc, item) => {
        const product = products.find(p => p.id === item.id);
        return acc + item.contador * product.price;
    }, 0);

    cartTotalElement.textContent = total.toFixed(2);
}

function checkout() {
    alert(`Gracias por su compra! Total a pagar $${document.querySelector('#cart-total').textContent}`);
}

document.addEventListener('load', function () {
    const productsContainer = document.getElementById('products');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.dataset.id = product.id;
        productElement.innerHTML = `
            <img src="product${product.id}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
    });
});
