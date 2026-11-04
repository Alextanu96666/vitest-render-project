import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const port = 3000;

const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
    { id: 5, name: 'Product 5', price: 400 },
    { id: 6, name: 'Product 6', price: 500 },
    { id: 7, name: 'Product 7', price: 600 },
    { id: 8, name: 'Product 8', price: 700 },
    { id: 9, name: 'Product 9', price: 400 },
    { id: 10, name: 'Product 10', price: 400 },
    { id: 11, name: 'Product 11', price: 400 },
    { id: 12, name: 'Product 12', price: 400 },
    { id: 13, name: 'Product 13', price: 400 },
]

export let cart = []

const logFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'log.txt');

function log(message, data) {
    const line = data === undefined
        ? `[${new Date().toISOString()}] ${message}\n`
        : `[${new Date().toISOString()}] ${message} ${JSON.stringify(data)}\n`;
    fs.appendFileSync(logFile, line);
}

export function getProducts() {
    // return 'Hej världen';
    log('Fetching products');
    log('Products:', products);

    try {
        // Simulate fetching products
        log('Simulating product fetch...');
    } catch (error) {
        log('Error fetching products:', error.message);
    }

    return products;
}

export function deleteProduct(product) {
    const index = products.indexOf(product);
    log('Deleting product:', product);
    if (index > -1) {
        products.splice(index, 1);
        log('Product deleted successfully:', product);
    } else {
        log('Product not found for deletion:', product);
    }
}

export function createProduct(product) {
    log('Creating product:', product);
    products.push(product);
    log('Product created successfully:', product);
}

export function addToCart(product) {
    log('Adding to cart:', product);
    cart.push(product);
    log('Product added to cart successfully:', product);
}


export function removeFromCart(product) {
    log('Removing from cart:', product);    
    cart.splice(cart.indexOf(product), 1);
    log('Product removed from cart successfully:', product);
}


// Routes and ep
app.get('/products', (req, res) => {
    const products = getProducts();
    res.json(products);
});

app.post('/products', express.json(), (req, res) => {
    const product = req.body;
    createProduct(product);
    res.status(201).json(getProducts());
});

app.delete('/products', express.json(), (req, res) => {
    const product = req.body;
    deleteProduct(product);
    res.status(200).json(getProducts());
});

app.get('/cart', (req, res) => {
    res.json(cart);
});

app.post('/cart', express.json(), (req, res) => {
    const product = req.body;
    addToCart(product);
    res.status(201).json(cart);
});

app.delete('/cart', express.json(), (req, res) => {
    const product = req.body;
    removeFromCart(product);
    res.status(200).json(cart);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});