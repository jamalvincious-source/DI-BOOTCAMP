"use strict";
// Function to print user details
function printUserDetails(user) {
    console.log("---------------");
    console.log("User ID:", user.id);
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    if (user.membershipLevel !== undefined) {
        console.log("Membership Level:", user.membershipLevel);
    }
    else {
        console.log("Membership Level: Not provided");
    }
}
// User with membership level
const user1 = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    membershipLevel: "Gold"
};
// User without membership level
const user2 = {
    id: 2,
    name: "Mary Smith",
    email: "mary@example.com"
};
// Print details
printUserDetails(user1);
printUserDetails(user2);
