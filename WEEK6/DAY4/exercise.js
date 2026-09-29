const products = require('./products');

function findProductByName(productName) {
  return products.find(
    (product) => product.name.toLowerCase() === productName.toLowerCase()
  );
}

function printProductDetails(productName) {
  const product = findProductByName(productName);

  if (product) {
    console.log(`Name: ${product.name}`);
    console.log(`Price: $${product.price}`);
    console.log(`Category: ${product.category}`);
    console.log('---');
  } else {
    console.log(`Product "${productName}" not found.`);
    console.log('---');
  }
}

printProductDetails('Laptop');
printProductDetails('Headphones');
printProductDetails('Coffee Mug');
printProductDetails('Desk Chair');
printProductDetails('Notebook');
printProductDetails('Tablet');