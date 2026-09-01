const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};

let resultString = "";

for (let key in details) {
    resultString += key + " " + details[key] + " ";
}

// Trim trailing whitespace and log
console.log(resultString.trim());