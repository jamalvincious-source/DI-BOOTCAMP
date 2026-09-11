class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
}

const myLabrador = new Labrador("Max", "large");

console.log(myLabrador);
console.log(myLabrador.name);
console.log(myLabrador.size);