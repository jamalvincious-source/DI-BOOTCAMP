```javascript
// fileManager.js

const fs = require("fs");

// Function to read a file
function readFile(fileName) {
    const content = fs.readFileSync(fileName, "utf8");
    return content;
}

// Function to write to a file
function writeFile(fileName, content) {
    fs.writeFileSync(fileName, content, "utf8");
}

// Export both functions
module.exports = {
    readFile,
    writeFile
};
```
```javascript
// app.js

// Import functions from fileManager.js
const { readFile, writeFile } = require("./fileManager");

// Read Hello World.txt
const content = readFile("Hello World.txt");

// Display the content
console.log("Content of Hello World.txt:");
console.log(content);

// Write new content to Bye World.txt
writeFile("Bye World.txt", "Writing to the file");

console.log("Content successfully written to Bye World.txt");
```
