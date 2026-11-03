import { describe, it, expect } from 'vitest';
import { 
    getProducts, 
    cart, 
    addToCart, 
    removeFromCart,
    deleteProduct,
    createProduct
} from '../server.js';

describe('Products', () => {
  it('should return an array of products', () => {
    expect(Array.isArray(getProducts())).toBe(true);
  });

  it('should delete a product from the products list', () => {
    const products = getProducts();
    const product = products[0];
    // Assuming there is a deleteProduct function
    deleteProduct(product);
    expect(getProducts()).not.toContain(product);
  });

  it('should create a new product in the products list', () => {
    const newProduct = { id: 14, name: 'Product 14', price: 400 };
    createProduct(newProduct);
    expect(getProducts()).toContain(newProduct);
  });
});

describe('Cart', () => {
  it('should have an empty cart initially', () => {
    expect(cart.length).toBe(0);
  });

  it('should allow adding a product to the cart', () => {

    // Here I can hard code the product/schema myself
    const product = { id: 1, name: 'Product 1', price: 100 };

    addToCart(product);

    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual(product);
  });

  it('should allow to remove from cart', () => {
    const product = cart[0];
    // Remove the product from the cart
    removeFromCart(product);
    expect(cart.length).toBe(0);
  });




});