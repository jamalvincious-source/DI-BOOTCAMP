
export {};

class Product {
    // Static property
    static category: string = "Electronics";

    // Normal property
    public name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    // Static method
    static getCategory(): string {
        return `Product category: ${Product.category}`;
    }

    // Normal method
    getProductInfo(): string {
        return `${this.name} costs $${this.price}`;
    }
}

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
``
