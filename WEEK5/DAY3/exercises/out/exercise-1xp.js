"use strict";
class Employee {
    // Constructor
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    // Public method
    getEmployeeInfo() {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}
// Create an Employee object
const employee1 = new Employee("John", 50000, "Software Developer", "IT");
// Get employee information
console.log(employee1.getEmployeeInfo());
// Public property can be accessed directly
console.log("Position:", employee1.position);
