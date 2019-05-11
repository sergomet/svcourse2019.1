// Folosindu-va de cunostintele dobandite creati clase care sa
// calculeze perimetrul si aria a 3 tipuri de triunghiuri: echilateral, isoscel, dreptunghic
// vreau sa vad ca va folositi de mostenire (deci exista cel putin o clasa parinte)
// vreau sa vad ca, clasele au proprietati si metode

class Shape {
  sides = [];
  category = null;

  detectCategory() {
    if (this.sides.length !== 3) {
      return this.setCategory("nu este trinunghi");
    }

    if (this.sides.every((side, i, sides) => side === sides[0])) {
      return this.setCategory("isoscel");
    }

    if (this.sides[0] === this.sides[1] || this.sides[1] === this.sides[2]) {
      return this.setCategory("echilateral");
    }

    this.setCategory("dreptunghic sau scalar");
  }

  setCategory(name) {
    this.category = name;
  }

  getCategory() {
    return this.category;
  }
}

class Triangle extends Shape {
  constructor(...args) {
    super();
    this.sides = args;
    this.detectCategory();
  }

  name() {
    return this.getCategory().toUpperCase();
  }

  getPerimeter() {
    let perimeter = 0;
    this.sides.map(side => (perimeter += side));
    return perimeter;
  }

  getArea() {
    const category = this.category;
    let aria = 0;
    // if (category === "isoscel") {
    aria = (Math.pow(this.sides[0], 2) * Math.sqrt(3)) / 4;
    // }

    return aria.toFixed(2);
  }
}

let shape1 = new Triangle(2, 2, 2);
console.log(shape1.name());
console.log(shape1.getPerimeter());
console.log(shape1.getArea());

let shape2 = new Triangle(2, 2, 1);
console.log(shape2.getCategory());
console.log(shape2.getPerimeter());
console.log(shape2.getArea());

let shape3 = new Triangle(2, 2, 1);
console.log(shape3.getCategory());
console.log(shape3.getPerimeter());
console.log(shape3.getArea());

let shape4 = new Triangle(1, 2, 3);
console.log(shape4.getCategory());
console.log(shape4.getPerimeter());
console.log(shape4.getArea());
