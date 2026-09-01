function abbrevName(str) {
    const nameParts = str.trim().split(" ");
    if (nameParts.length > 1) {
        return `${nameParts[0]} ${nameParts[1].charAt(0)}.`;
    }
    return nameParts[0];
}

console.log(abbrevName("Robin Singh")); // "Robin S."