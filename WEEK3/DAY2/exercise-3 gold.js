function swapCase(str) {
    return str
        .split("")
        .map(char => {
            if (char === char.toUpperCase()) {
                return char.toLowerCase();
            } else {
                return char.toUpperCase();
            }
        })
        .join("");
}

console.log(swapCase('The Quick Brown Fox')); // 'tHE qUICK bROWN fOX'