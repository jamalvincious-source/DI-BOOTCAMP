let userNumber;

do {
  userNumber = prompt("Enter a number:");

  // prompt() always returns a string, so convert before comparing
  userNumber = Number(userNumber);

  console.log("Type of input:", typeof userNumber);

  if (Number.isNaN(userNumber)) {
    console.log("Invalid input. Please enter a valid number.");
  }
} while (Number.isNaN(userNumber) || userNumber < 10);

console.log("Final valid number:", userNumber);
