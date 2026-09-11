```javascript
// Get the form
const form = document.getElementById("myForm");

// Get the output area
const output = document.getElementById("output");

// Listen for the form submission
form.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the values from the inputs
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;

    // Create an object
    const user = {
        name: name,
        lastName: lastName
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(user);

    // Display the JSON string on the DOM
    output.textContent = jsonString;
});
```
