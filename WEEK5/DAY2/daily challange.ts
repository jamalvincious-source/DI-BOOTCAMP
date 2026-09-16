// Exercise 3: Validate Union Type

function validateUnionType(
    value: any,
    allowedTypes: string[]
): boolean {
    // Check each allowed type
    for (let type of allowedTypes) {
        if (typeof value === type) {
            return true;
        }
    }

    // If the type was not found
    return false;
}


// Variables with different types
let userName: string = "John";
let userAge: number = 25;
let isStudent: boolean = true;
let userHobbies: string[] = ["coding", "reading"];


// Validate the variables
console.log(validateUnionType(userName, ["string", "number"]));
console.log(validateUnionType(userAge, ["string", "number"]));
console.log(validateUnionType(isStudent, ["string", "number"]));
console.log(validateUnionType(userHobbies, ["object"]));