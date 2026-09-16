class Employee {
    // Private properties
    private name: string;
    private salary: number;

    // Public property
    public position: string;

    // Protected property
    protected department: string;

    // Constructor
    constructor(
        name: string,
        salary: number,
        position: string,
        department: string
    ) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }

    // Public method
    public getEmployeeInfo(): string {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}


// Create an Employee object
const employee1 = new Employee(
    "John",
    50000,
    "Software Developer",
    "IT"
);


// Get employee information
console.log(employee1.getEmployeeInfo());

// Public property can be accessed directly
console.log("Position:", employee1.position);