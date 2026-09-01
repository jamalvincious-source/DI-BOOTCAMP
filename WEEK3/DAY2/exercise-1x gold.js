function isBlank(str) {
    if (str.length === 0) {
        return true;
    }
    return str.trim() === "";
}

console.log(isBlank('')); // true
console.log(isBlank('abc')); // false