class Product {
    readonly id: number;
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getProductInfo(): string {
        return `Product: ${this.name}, Price: ${this.price}`;
    }
}

const product1 = new Product(1, "Laptop", 50000);

console.log(product1.getProductInfo());

console.log("Product ID:", product1.id);

product1.name = "Gaming Laptop";
product1.price = 65000;

console.log(product1.getProductInfo());

// product1.id = 2;