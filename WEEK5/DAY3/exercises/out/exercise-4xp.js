"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // Static method
    static getCategory() {
        return `Product category: ${Product.category}`;
    }
    // Normal method
    getProductInfo() {
        return `${this.name} costs $${this.price}`;
    }
}
// Static property
Product.category = "Electronics";
// Access static property directly through the class
console.log("Category:", Product.category);
// Access static method directly through the class
console.log(Product.getCategory());
// Create an instance
const product = new Product("Laptop", 1000);
// Access normal properties and methods through the instance
console.log(product.getProductInfo());
console.log("Name:", product.name);
console.log("Price:", product.price);
``;
