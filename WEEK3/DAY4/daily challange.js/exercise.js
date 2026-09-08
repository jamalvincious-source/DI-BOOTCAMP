let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
};

// 1. Display the 3 fruits
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => {
        console.log(fruit);
    });
};

// Call displayGroceries
displayGroceries();


// 2. Clone groceries
const cloneGroceries = () => {

    // Copy client
    let user = client;

    // Change client
    client = "Betty";

    console.log("client:", client);
    console.log("user:", user);


    // Deep-copy groceries so nested values stay independent
    let shopping = structuredClone(groceries);

    // Change total price
    shopping.totalPrice = "35$";

    console.log("groceries:", groceries.totalPrice);
    console.log("shopping:", shopping.totalPrice);


    // Change paid
    shopping.other.paid = false;

    console.log("groceries paid:", groceries.other.paid);
    console.log("shopping paid:", shopping.other.paid);
};

// 3. Invoke cloneGroceries
cloneGroceries();
